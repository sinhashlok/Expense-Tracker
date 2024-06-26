"use client";

const Profile = ({user}: {user: {name: string, email: string} | undefined}) => {
  console.log(user);
  
  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-lg md:text-2xl font-semibold">Hi, {user?.name}</h1>
      </div>
    </div>
  );
};

export default Profile;
