import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <UserProfile path="/user-profile" routing="path" className="bg-blue-500 rounded-lg p-8 shadow-lg" />
  </div>
);

export default UserProfilePage;