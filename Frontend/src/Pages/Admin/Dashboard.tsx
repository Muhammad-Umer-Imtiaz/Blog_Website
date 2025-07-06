import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../Components/admin/BlogTableItem';
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';

type Blog = {
  _id: string;
  title: string;
  createdAt: string;
  isPublished: boolean;
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<{
    blogs: number;
    comments: number;
    drafts: number;
    recentBlogs: Blog[];
  }>({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');

      if (data.success) {
        setDashboardData(data.dashboard);
      } else {
        toast.error(data.error || 'Failed to fetch dashboard');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Cards */}
      <div className="flex flex-wrap gap-4">
        <DashboardCard icon={assets.dashboard_icon_1} count={dashboardData.blogs} label="Blogs" />
        <DashboardCard icon={assets.dashboard_icon_2} count={dashboardData.comments} label="Comments" />
        <DashboardCard icon={assets.dashboard_icon_3} count={dashboardData.drafts} label="Drafts" />
      </div>

      {/* Latest Blogs Table */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="icon" />
          <p>Latest Blogs</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th className="px-2 py-4 xl:px-6">#</th>
                <th className="px-2 py-4">Blog Title</th>
                <th className="px-2 py-4 max-sm:hidden">Date</th>
                <th className="px-2 py-4 max-sm:hidden">Status</th>
                <th className="px-2 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchBlogs={fetchDashboard}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// Reusable Card Component
const DashboardCard: React.FC<{ icon: string; count: number; label: string }> = ({
  icon,
  count,
  label
}) => (
  <div className="flex items-center gap-4 bg-white min-w-58 p-4 rounded shadow cursor-pointer hover:scale-105 transition-all">
    <img src={icon} alt={label} className="w-10 h-10" />
    <div>
      <p className="text-xl font-semibold text-gray-600">{count}</p>
      <p className="text-gray-400 font-light">{label}</p>
    </div>
  </div>
);
