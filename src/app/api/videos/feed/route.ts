import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Mock data for testing
const mockVideos = Array.from({ length: 20 }, (_, i) => ({
  id: `video-${i + 1}`,
  tagList: ['Health', 'Fitness', 'Wellness', 'Nutrition'][Math.floor(Math.random() * 4)].split(' '),
  videoViews: Math.floor(Math.random() * 10000),
  expertImage: 'https://via.placeholder.com/150x150.png?text=Expert',
  expertName: `Expert ${i + 1}`,
  expertSpecialization: ['Nutritionist', 'Fitness Trainer', 'Health Coach'][Math.floor(Math.random() * 3)],
  thumbnailUrl: 'https://via.placeholder.com/400x600.png?text=Video+Thumbnail',
  videoUrl: `/api/videos/${i + 1}/stream`
}));

const categories = ['Health', 'Fitness', 'Wellness', 'Nutrition', 'Mental Health', 'Yoga'];

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const categoriesParam = searchParams.get('categories');
    
    // Parse categories
    const selectedCategories = categoriesParam ? categoriesParam.split(',') : [];

    // Filter videos by categories if specified
    let filteredVideos = mockVideos;
    if (selectedCategories.length > 0) {
      filteredVideos = mockVideos.filter(video => 
        video.tagList.some(tag => selectedCategories.includes(tag))
      );
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex);
    const hasReachedMax = endIndex >= filteredVideos.length;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Videos fetched successfully',
      data: {
        videos: paginatedVideos,
        categories,
        hasReachedMax
      }
    });
  } catch (error) {
    console.error('Error in video feed API:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch videos',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 