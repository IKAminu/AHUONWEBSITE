import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search, MapPin, Filter, X, Users, ChevronRight, CheckCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Pagination } from '../components/Pagination';
import { SetupGuide } from '../components/SetupGuide';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

const NIGERIAN_STATES = [
  'All States', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

type SortOption = 'name-asc' | 'name-desc' | 'location' | 'experience';

export function Directory() {
  const [searchParams] = useSearchParams();
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('membershipStatus', 'active')
        .order('companyName', { ascending: true });

      if (error) throw error;
      setMembers(data || []);
      setHasError(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAndSortedMembers = useMemo(() => {
    let filtered = [...members];

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.officeCity?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.officeState?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedState && selectedState !== 'All States') {
      filtered = filtered.filter(m => m.officeState === selectedState);
    }

    if (selectedServices.length > 0) {
      filtered = filtered.filter(m =>
        selectedServices.some(service => m.servicesOffered?.includes(service))
      );
    }

    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.companyName?.localeCompare(b.companyName) || 0);
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.companyName?.localeCompare(a.companyName) || 0);
        break;
      case 'location':
        filtered.sort((a, b) => {
          const sc = a.officeState?.localeCompare(b.officeState) || 0;
          return sc !== 0 ? sc : a.officeCity?.localeCompare(b.officeCity) || 0;
        });
        break;
      case 'experience':
        const expOrder: any = { '15+': 4, '10-15': 3, '5-10': 2, '1-5': 1 };
        filtered.sort((a, b) => (expOrder[b.yearsInOperation] || 0) - (expOrder[a.yearsInOperation] || 0));
        break;
    }

    return filtered;
  }, [members, searchQuery, selectedState, selectedServices, sortBy]);

  const displayedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedMembers.slice(start, start + itemsPerPage);
  }, [filteredAndSortedMembers, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedState, selectedServices, sortBy]);

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('All States');
    setSelectedServices([]);
    setSortBy('name-asc');
  };

  const hasActiveFilters =
    searchQuery || selectedState !== 'All States' || selectedServices.length > 0;

  const totalPages = Math.ceil(filteredAndSortedMembers.length / itemsPerPage);

  if (!isLoading && members.length === 0 && hasError) {
    return <SetupGuide />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF9]">
      {/* Page header */}
      <div className="bg-white border-b border-[#E2E8E4]">
        <div className="max-w-[1280px] mx-auto px-6 py-10">
          <h1 className="text-2xl md:text-3xl font-bold text-[#17211B] mb-1">Member Directory</h1>
          <p className="text-[15px] text-[#66736A]">
            Browse verified AHUON members — licensed Hajj and Umrah operators across Nigeria.
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        {/* Search bar */}
        <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-6">
          <label htmlFor="operator-search" className="sr-only">
            Search for operators by company name, city, or state
          </label>
          <div className="flex gap-3">
            <div className="flex items-center flex-1 max-w-xl border border-[#E2E8E4] rounded-md px-3 focus-within:border-[#008000] focus-within:ring-1 focus-within:ring-[#008000] bg-white transition-all">
              <Search size={16} className="text-[#66736A] mr-2 flex-shrink-0" aria-hidden="true" />
              <input
                id="operator-search"
                type="text"
                placeholder="Search by company name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2.5 bg-transparent outline-none text-sm text-[#17211B] placeholder:text-[#66736A]"
                aria-label="Search operators"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-[#66736A] hover:text-[#17211B] focus:outline-none"
                  aria-label="Clear search"
                  type="button"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 border border-[#E2E8E4] bg-white rounded-md px-4 py-2.5 text-sm font-medium text-[#17211B] hover:bg-[#F8FAF9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008000]"
              aria-expanded={showFilters}
              type="button"
            >
              <Filter size={14} />
              Filters
              {hasActiveFilters && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#008000]" />
              )}
            </button>
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside
            className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-56 flex-shrink-0`}
            aria-label="Filter options"
          >
            <div className="bg-white border border-[#E2E8E4] rounded-lg p-5 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-sm text-[#17211B]">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#008000] hover:underline font-medium"
                    type="button"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {/* State */}
                <div>
                  <label htmlFor="state-filter" className="block text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-2">
                    State
                  </label>
                  <select
                    id="state-filter"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full border border-[#E2E8E4] rounded-md px-3 py-2 text-sm text-[#17211B] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none bg-white"
                    aria-label="Filter by state"
                  >
                    {NIGERIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                {/* Services */}
                <div>
                  <fieldset>
                    <legend className="block text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-2">
                      Services
                    </legend>
                    <div className="space-y-2">
                      {['Hajj', 'Umrah', 'Both'].map((service) => (
                        <label key={service} className="flex items-center gap-2.5 cursor-pointer text-sm text-[#17211B]">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => toggleService(service)}
                            className="w-4 h-4 rounded border-[#E2E8E4] text-[#008000] focus:ring-[#008000]"
                          />
                          {service}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                {/* Sort */}
                <div>
                  <label htmlFor="sort-select" className="block text-[11px] font-semibold uppercase tracking-widest text-[#66736A] mb-2">
                    Sort By
                  </label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full border border-[#E2E8E4] rounded-md px-3 py-2 text-sm text-[#17211B] focus:border-[#008000] focus:ring-1 focus:ring-[#008000] focus:outline-none bg-white"
                  >
                    <option value="name-asc">Name (A–Z)</option>
                    <option value="name-desc">Name (Z–A)</option>
                    <option value="location">Location</option>
                    <option value="experience">Experience</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-[#66736A]" role="status" aria-live="polite">
                <span className="font-semibold text-[#17211B]">{filteredAndSortedMembers.length}</span>{' '}
                {filteredAndSortedMembers.length !== 1 ? 'operators' : 'operator'} found
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" aria-busy="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white border border-[#E2E8E4] rounded-lg p-5 animate-pulse">
                    <div className="h-4 bg-gray-100 rounded mb-3 w-3/4" />
                    <div className="h-3 bg-gray-100 rounded mb-2 w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredAndSortedMembers.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E2E8E4] rounded-lg">
                <Users size={36} className="text-[#66736A] mx-auto mb-4" />
                <h3 className="font-semibold text-[#17211B] mb-2">No operators found</h3>
                <p className="text-sm text-[#66736A] mb-5">
                  No operators match your current filters. Try adjusting your search.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-semibold text-[#008000] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" role="list">
                  {displayedMembers.map((member) => (
                    <Link
                      key={member.id}
                      to={`/directory/${member.id}`}
                      className="group bg-white border border-[#E2E8E4] rounded-lg p-5 hover:border-[#008000] hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
                      role="listitem"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0 pr-3">
                          <h3 className="font-semibold text-[15px] text-[#17211B] group-hover:text-[#008000] transition-colors leading-snug line-clamp-2">
                            {member.companyName}
                          </h3>
                        </div>
                        <span className="flex-shrink-0 text-[10px] font-semibold bg-[#F3E7B3] text-[#92731E] px-2 py-0.5 rounded-sm uppercase tracking-wide">
                          Verified
                        </span>
                      </div>

                      <div className="space-y-1.5 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-[#66736A]">
                          <MapPin size={12} className="flex-shrink-0" aria-hidden="true" />
                          <span>{member.officeCity}, {member.officeState}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#66736A]">
                          <span className="font-medium text-[#17211B]">
                            {Array.isArray(member.servicesOffered)
                              ? member.servicesOffered.join(', ')
                              : member.servicesOffered}
                          </span>
                        </div>
                        {member.yearsInOperation && (
                          <div className="text-xs text-[#66736A]">
                            {member.yearsInOperation} years in operation
                          </div>
                        )}
                      </div>

                      {member.complaintCount === 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-green-700">
                          <CheckCircle size={12} />
                          <span>No unresolved complaints</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E2E8E4]">
                        <span className="text-xs font-medium text-[#008000] group-hover:underline flex items-center gap-1">
                          View profile
                          <ChevronRight size={12} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={filteredAndSortedMembers.length}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
