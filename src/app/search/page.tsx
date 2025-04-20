'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Star, ChevronRight } from 'lucide-react';
import { searchService, SearchExpertData, SpecializationData } from '@/services/api/search/searchService';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { USER_DEFAULT } from '@/constants/assets/imageConstants';

// Helper function to validate and get the correct image URL
const getImageUrl = (url: string | null | undefined): string => {
  if (!url || !(url.startsWith("http://") || url.startsWith("https://"))) {
    return USER_DEFAULT;
  }
  return url;
};

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [experts, setExperts] = useState<SearchExpertData[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationData[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const expertsPerPage = 20;

  useEffect(() => {
    fetchSpecializations();
    fetchExperts();
  }, []);

  useEffect(() => {
    fetchExperts();
  }, [currentPage, selectedSpecialization]);

  const fetchSpecializations = async () => {
    try {
      const response = await searchService.getSpecializations();
      if (response.status === 200 && response.body.status) {
        setSpecializations(response.body.data);
      }
    } catch (error) {
      console.error('Error fetching specializations:', error);
    }
  };

  const fetchExperts = async (searchQuery?: string) => {
    setIsLoading(true);
    try {
      const query = searchQuery || selectedSpecialization || 'a';
      const response = await searchService.searchExperts(query, expertsPerPage, currentPage);
      if (response.status === 200 && response.body.status) {
        const { experts, totalItems, totalPages, currentPage: page } = response.body.data;
        setExperts(experts);
        setTotalPages(totalPages);
        setTotalItems(totalItems);
      }
    } catch (error) {
      console.error('Error fetching experts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpecializationClick = (specialization: string) => {
    setSelectedSpecialization(specialization);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedSpecialization('');

    // Debounce the search to avoid too many API calls
    const timeoutId = setTimeout(() => {
      fetchExperts(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#0F1629] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search experts by name or specialization..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-600
                       bg-[#1C2537] text-white placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200"
            />
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-white">Specializations</h2>
          <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
            <button
              onClick={() => handleSpecializationClick('')}
              className={`flex flex-col items-center min-w-[100px] p-3 rounded-xl transition-all duration-200
                ${!selectedSpecialization 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-[#1C2537] text-gray-300 hover:bg-[#2A3447]'}`}
            >
              <div className="w-12 h-12 rounded-full bg-[#2A3447] flex items-center justify-center mb-2">
                <span className="text-xl">🌟</span>
              </div>
              <span className="text-sm font-medium">All</span>
            </button>
            {specializations.map((spec) => (
              <button
                key={spec.id}
                onClick={() => handleSpecializationClick(spec.specialization_name)}
                className={`flex flex-col items-center min-w-[100px] p-3 rounded-xl transition-all duration-200
                  ${selectedSpecialization === spec.specialization_name 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-[#1C2537] text-gray-300 hover:bg-[#2A3447]'}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#2A3447] flex items-center justify-center mb-2 overflow-hidden">
                  <Image
                    src={getImageUrl(spec.specialization_image)}
                    alt={spec.specialization_name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium text-center">{spec.specialization_name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Found {totalItems} Experts
          </p>
        </div>

        {/* Experts Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ExpertCardSkeleton key={index} />
            ))}
          </div>
        ) : experts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {experts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium
                    ${currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-[#1C2537] text-gray-300 hover:bg-[#2A3447]'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No experts found</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ExpertCard({ expert }: { expert: SearchExpertData }) {
  const getImageUrl = (url: string | null | undefined): string => {
    if (!url || !(url.startsWith("http://") || url.startsWith("https://"))) {
      return USER_DEFAULT;
    }
    return url;
  };

  const isDefaultAvatar = !expert.profile_picture || expert.profile_picture === 'url' || expert.profile_picture === 'temp_url';

  return (
    <Link href={`/expert/${expert.id}`}>
      <div className="bg-[#1C2537] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
        <div className="relative h-48">
          <Image
            src={getImageUrl(expert.profile_picture)}
            alt={`${expert.first_name} ${expert.last_name}`}
            fill
            className={`object-cover ${isDefaultAvatar ? 'object-contain p-4' : 'object-cover'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {expert.isFollowing && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Following
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-white">
            {expert.first_name} {expert.last_name}
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            {expert.specialization}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="mr-1" />
              <span>{expert.rating.toFixed(1)}</span>
            </div>
            <div className="text-gray-400">
              {expert.consultations} consultations
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ExpertCardSkeleton() {
  return (
    <div className="bg-[#1C2537] rounded-xl overflow-hidden shadow-lg">
      <Skeleton className="h-48 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
