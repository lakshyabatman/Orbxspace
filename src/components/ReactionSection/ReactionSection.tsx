import React, { useState } from "react";
import HahaIcon from "../../assets/icons/Haha.svg";
import HeartIcon from "../../assets/icons/Heart.svg";
import Downvote from "../../assets/icons/Downvote.svg";
import { ReactionType } from "../../models";

export interface ReactionSectionProps {
  heartCounts: number;
  hahaCounts: number;
  downvoteCounts: number;
  react: (reactionType: ReactionType) => Promise<boolean>;
}

const ReactionSection: React.FC<ReactionSectionProps> = ({
  hahaCounts,
  heartCounts,
  downvoteCounts,
  react,
}) => {
  const [haha, setHaha] = useState(hahaCounts);
  const [like, setLike] = useState(heartCounts);

  const [downvote, setDownvote] = useState(downvoteCounts);

  const reactToPost = async (reaction: ReactionType) => {
    const res = await react(reaction);

    switch (reaction) {
      case ReactionType.Haha:
        setHaha(haha + (res ? 1 : 0));
        return;
      case ReactionType.Downvote:
        setDownvote(downvote + (res ? 1 : 0));
        return;
      case ReactionType.Like:
        setLike(like + (res ? 1 : 0));
        return;
    }
  };

  return (
    <div className="flex ">
      <div className="flex items-center">
        <div
          onClick={() => reactToPost(ReactionType.Haha)}
          className="cursor-pointer"
        >
          <HahaIcon />
        </div>
        <span className="ml-1">{haha}</span>
      </div>
      <div className="flex items-center ml-3 mr-3">
        <div
          onClick={() => reactToPost(ReactionType.Like)}
          className="cursor-pointer"
        >
          <HeartIcon />
        </div>
        <span className="ml-1">{like}</span>
      </div>
      <div className="flex items-center">
        <div
          onClick={() => reactToPost(ReactionType.Downvote)}
          className="cursor-pointer"
        >
          <Downvote />
        </div>
        <span className="ml-1">{downvote}</span>
      </div>
    </div>
  );
};

export default ReactionSection;
