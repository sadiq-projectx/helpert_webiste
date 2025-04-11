import React from "react";
import IconButton from "../../../../components/ui/buttons/IconButton"; // Adjust the import path as necessary

interface FollowStatsProps {
  followers: number;
  following: number;
  onShareClick: () => void;
}

const FollowStats: React.FC<FollowStatsProps> = ({
  followers,
  following,
  onShareClick,
}) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="text-center">
        <p className="text-lg font-bold">{followers}</p>
        <p className="text-gray-500">Followers</p>
      </div>
      <div className="text-center">
        <p className="text-lg font-bold">{following}</p>
        <p className="text-gray-500">Following</p>
      </div>
      <IconButton
        icon="fas fa-share-alt"
        onClick={onShareClick}
        backgroundColor="transparent"
        color="blue"
      />
    </div>
  );
};

export default FollowStats;