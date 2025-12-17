import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListing = ({ job }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // DEFENSIVE CHECK: If job is missing, don't crash the app
  if (!job) return null;

  // Ensure description exists before trying to use .substring()
  let description = job.description || "";

  if (!showFullDescription && description.length > 90) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          {/* Use optional chaining or defaults for safety */}
          <div className='text-gray-600 my-2'>{job.type || 'Full-Time'}</div>
          <h3 className='text-xl font-bold'>{job.title || 'Job Title'}</h3>
        </div>

        <div className='mb-5'>{description}</div>

        {/* Only show 'More/Less' button if description is long enough */}
        {(job.description?.length > 90) && (
          <button
            onClick={() => setShowFullDescription((prevState) => !prevState)}
            className='text-indigo-500 mb-5 hover:text-indigo-600'
          >
            {showFullDescription ? 'Less' : 'More'}
          </button>
        )}

        <h3 className='text-indigo-500 mb-2'>{job.salary} / Year</h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='text-orange-700 mb-3'>
            <FaMapMarker className='inline text-lg mb-1 mr-1' />
            {job.location}
          </div>
          <Link
            to={`/jobs/${job.id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobListing;