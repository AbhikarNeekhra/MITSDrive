import Skeleton from '@mui/material/Skeleton';

const FileHorizontalSkeleton = (props) => {
    return (
        <div className="file-icon-card">
            <div className="icon">
                <Skeleton variant="rectangular" width={32} height={30} sx={{ mr: .55, borderRadius: 2 }} />
            </div>
            <div className="file-details">
                <Skeleton variant="rectangular" width={90} height={20} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={90} height={20} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={90} height={20} sx={{ borderRadius: 1 }} />
            </div>
            <div className="share">
                <div className="circleholder">
                    <Skeleton className="circles" variant="circle" />
                    <Skeleton className="circles" variant="circle" />
                    <Skeleton className="circles" variant="circle" />
                </div>
            </div>
        </div>
    );
};

export default FileHorizontalSkeleton;