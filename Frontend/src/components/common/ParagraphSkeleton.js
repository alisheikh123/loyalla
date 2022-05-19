import React from "react";


const ParagraphSkeleton = ({title}) => {

  return (
    <div className="loading-skeleton">
        <span className="btn btn-primary">{title}</span>
    </div>
  )
};


export default ParagraphSkeleton;
