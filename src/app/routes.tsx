import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Directory } from "./pages/Directory";
import { MemberDetail } from "./pages/MemberDetail";
import { FileComplaint } from "./pages/FileComplaint";
import { ComplaintStatus } from "./pages/ComplaintStatus";
import { MemberDashboard } from "./pages/MemberDashboard";
import { ExcoDashboard } from "./pages/ExcoDashboard";
import { News } from "./pages/News";
import { VerifyCertificate } from "./pages/VerifyCertificate";
import { NotFound } from "./pages/NotFound";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "register", Component: Register },
        { path: "login", Component: Login },
        { path: "directory", Component: Directory },
        { path: "directory/:memberId", Component: MemberDetail },
        { path: "file-complaint", Component: FileComplaint },
        { path: "complaint-status", Component: ComplaintStatus },
        { path: "member-dashboard", Component: MemberDashboard },
        { path: "exco", Component: ExcoDashboard },
        { path: "news", Component: News },
        { path: "verify", Component: VerifyCertificate },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  { basename },
);
