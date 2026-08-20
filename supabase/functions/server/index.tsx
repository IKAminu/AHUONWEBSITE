import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6dc3601f/health", (c) => {
  return c.json({ status: "ok" });
});

// MEMBER REGISTRATION ENDPOINTS

// Create new member registration
app.post("/make-server-6dc3601f/register", async (c) => {
  try {
    const body = await c.req.json();
    const {
      email,
      password,
      companyName,
      rcNumber,
      nahconLicense,
      yearsInOperation,
      officeAddress,
      officeCity,
      officeState,
      servicesOffered,
      principalOfficerName,
      principalOfficerPhone,
      principalOfficerPosition,
      referee1Name,
      referee1MembershipNo,
      referee2Name,
      referee2MembershipNo,
      bankName,
      accountNumber,
      accountName,
    } = body;

    // Create user account with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: {
        role: 'pending_member',
        companyName,
        rcNumber,
        nahconLicense,
        yearsInOperation,
        officeAddress,
        officeCity,
        officeState,
        servicesOffered,
        principalOfficerName,
        principalOfficerPhone,
        principalOfficerPosition,
        referee1Name,
        referee1MembershipNo,
        referee2Name,
        referee2MembershipNo,
        bankName,
        accountNumber,
        accountName,
        membershipStatus: 'pending',
        applicationDate: new Date().toISOString(),
      }
    });

    if (authError) {
      console.error('Auth error during registration:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store additional member data in KV store
    const memberId = authData.user.id;
    await kv.set(`member:${memberId}`, {
      id: memberId,
      email,
      companyName,
      rcNumber,
      nahconLicense,
      yearsInOperation,
      officeAddress,
      officeCity,
      officeState,
      servicesOffered,
      principalOfficerName,
      principalOfficerPhone,
      principalOfficerPosition,
      referee1Name,
      referee1MembershipNo,
      referee2Name,
      referee2MembershipNo,
      bankName,
      accountNumber,
      accountName,
      membershipStatus: 'pending',
      applicationDate: new Date().toISOString(),
      complaintCount: 0,
      complaintResolvedCount: 0,
    });

    // Add to pending registrations list
    await kv.set(`pending:${memberId}`, {
      memberId,
      companyName,
      applicationDate: new Date().toISOString(),
    });

    return c.json({ 
      success: true, 
      message: 'Application submitted successfully',
      memberId 
    });
  } catch (error) {
    console.error('Error during member registration:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// AUTHENTICATION ENDPOINTS

// Sign in
app.post("/make-server-6dc3601f/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Sign in error:', error);
      return c.json({ error: error.message }, 401);
    }

    // Get member data
    const memberData = await kv.get(`member:${data.user.id}`);

    return c.json({ 
      success: true,
      user: data.user,
      session: data.session,
      memberData,
    });
  } catch (error) {
    console.error('Error during sign in:', error);
    return c.json({ error: 'Sign in failed' }, 500);
  }
});

// MEMBER DIRECTORY ENDPOINTS

// Get all active members for directory
app.get("/make-server-6dc3601f/members", async (c) => {
  try {
    const search = c.req.query('search') || '';
    const state = c.req.query('state') || '';
    const services = c.req.query('services') || '';

    // Get all members from KV store
    const members = await kv.getByPrefix('member:');
    
    // Filter active members only
    const activeMembers = members.filter((m: any) => m.membershipStatus === 'active');

    // Apply filters
    let filteredMembers = activeMembers;
    
    if (search) {
      filteredMembers = filteredMembers.filter((m: any) => 
        m.companyName.toLowerCase().includes(search.toLowerCase()) ||
        m.officeCity.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (state) {
      filteredMembers = filteredMembers.filter((m: any) => m.officeState === state);
    }

    if (services) {
      filteredMembers = filteredMembers.filter((m: any) => 
        m.servicesOffered.includes(services)
      );
    }

    return c.json({ members: filteredMembers });
  } catch (error) {
    console.error('Error fetching members:', error);
    return c.json({ error: 'Failed to fetch members' }, 500);
  }
});

// Get member details
app.get("/make-server-6dc3601f/members/:id", async (c) => {
  try {
    const memberId = c.req.param('id');
    const memberData = await kv.get(`member:${memberId}`);

    if (!memberData) {
      return c.json({ error: 'Member not found' }, 404);
    }

    return c.json({ member: memberData });
  } catch (error) {
    console.error('Error fetching member details:', error);
    return c.json({ error: 'Failed to fetch member details' }, 500);
  }
});

// COMPLAINT ENDPOINTS

// File a complaint
app.post("/make-server-6dc3601f/complaints", async (c) => {
  try {
    const body = await c.req.json();
    const {
      operatorMemberId,
      pilgrimFullName,
      pilgrimPhone,
      pilgrimEmail,
      packageDetails,
      amountPaid,
      incidentDate,
      complaintCategory,
      description,
    } = body;

    // Generate complaint reference
    const year = new Date().getFullYear();
    const complaintCount = (await kv.getByPrefix('complaint:')).length;
    const complaintReference = `AHUON-${year}-${String(complaintCount + 1).padStart(4, '0')}`;

    const complaint = {
      complaintReference,
      operatorMemberId,
      pilgrimFullName,
      pilgrimPhone,
      pilgrimEmail,
      packageDetails,
      amountPaid,
      incidentDate,
      complaintCategory,
      description,
      status: 'new',
      dateFiled: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };

    await kv.set(`complaint:${complaintReference}`, complaint);

    // Update member complaint count
    const memberData = await kv.get(`member:${operatorMemberId}`);
    if (memberData) {
      memberData.complaintCount = (memberData.complaintCount || 0) + 1;
      await kv.set(`member:${operatorMemberId}`, memberData);
    }

    return c.json({ 
      success: true,
      complaintReference,
    });
  } catch (error) {
    console.error('Error filing complaint:', error);
    return c.json({ error: 'Failed to file complaint' }, 500);
  }
});

// Get complaint status
app.get("/make-server-6dc3601f/complaints/:reference", async (c) => {
  try {
    const reference = c.req.param('reference');
    const complaint = await kv.get(`complaint:${reference}`);

    if (!complaint) {
      return c.json({ error: 'Complaint not found' }, 404);
    }

    return c.json({ complaint });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    return c.json({ error: 'Failed to fetch complaint' }, 500);
  }
});

// Get all complaints for EXCO dashboard
app.get("/make-server-6dc3601f/exco/complaints", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const complaints = await kv.getByPrefix('complaint:');
    return c.json({ complaints });
  } catch (error) {
    console.error('Error fetching complaints for EXCO:', error);
    return c.json({ error: 'Failed to fetch complaints' }, 500);
  }
});

// EXCO ENDPOINTS

// Get pending registrations
app.get("/make-server-6dc3601f/exco/pending", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const pending = await kv.getByPrefix('pending:');
    return c.json({ pending });
  } catch (error) {
    console.error('Error fetching pending registrations:', error);
    return c.json({ error: 'Failed to fetch pending registrations' }, 500);
  }
});

// Approve member
app.post("/make-server-6dc3601f/exco/approve/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const memberId = c.req.param('id');
    const memberData = await kv.get(`member:${memberId}`);

    if (!memberData) {
      return c.json({ error: 'Member not found' }, 404);
    }

    // Generate membership number
    const year = new Date().getFullYear();
    const memberCount = (await kv.getByPrefix('member:')).filter((m: any) => m.membershipStatus === 'active').length;
    const membershipNumber = `AHUON-${year}-${String(memberCount + 1).padStart(5, '0')}`;

    // Update member status
    memberData.membershipStatus = 'active';
    memberData.membershipNumber = membershipNumber;
    memberData.membershipStartDate = new Date().toISOString();
    
    // Set expiry to 12 months from now
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    memberData.membershipExpiryDate = expiryDate.toISOString();

    await kv.set(`member:${memberId}`, memberData);

    // Remove from pending
    await kv.del(`pending:${memberId}`);

    return c.json({ 
      success: true,
      message: 'Member approved successfully',
      membershipNumber,
    });
  } catch (error) {
    console.error('Error approving member:', error);
    return c.json({ error: 'Failed to approve member' }, 500);
  }
});

// Update complaint status
app.put("/make-server-6dc3601f/exco/complaints/:reference", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (!user || error) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const reference = c.req.param('reference');
    const { status, excoNotes } = await c.req.json();

    const complaint = await kv.get(`complaint:${reference}`);
    if (!complaint) {
      return c.json({ error: 'Complaint not found' }, 404);
    }

    complaint.status = status;
    complaint.excoNotes = excoNotes;
    complaint.lastUpdated = new Date().toISOString();

    await kv.set(`complaint:${reference}`, complaint);

    return c.json({ success: true, complaint });
  } catch (error) {
    console.error('Error updating complaint:', error);
    return c.json({ error: 'Failed to update complaint' }, 500);
  }
});

Deno.serve(app.fetch);