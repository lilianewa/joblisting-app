import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchJobs = async () => {
    // 1. Use your REAL MockAPI base URL
    const baseUrl = 'https://6942c25169b12460f312b5ef.mockapi.io/jobs'; 
    
    const apiUrl = isHome ? `${baseUrl}?page=1&limit=3` : baseUrl;

    try {
      const res = await fetch(apiUrl);
      
      // Check if the response is actually okay before parsing
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      
      // 3. Safety check: Ensure data is an array before setting state
      setJobs(Array.isArray(data) ? data : []);
      
    } catch (error) {
      console.log('Error fetching data', error);
      setJobs([]); // Fallback to empty array on error to prevent .map crash
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, [isHome]);
  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'All Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default JobListings;
