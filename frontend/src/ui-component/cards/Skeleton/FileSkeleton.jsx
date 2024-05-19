import Skeleton from '@mui/material/Skeleton';

const FileSkeleton = (props) => {
    return (
        <>
            <div className="ele">
                <div className="name">
                    <Skeleton variant="rectangular" width={32} height={30} sx={{ mr: .55, borderRadius: 2 }} />
                    <label><Skeleton variant="rectangular" width={90} height={20} sx={{ borderRadius: 1 }} /></label>
                </div>
                <div className="size"><Skeleton variant="rectangular" width={45} height={20} sx={{ borderRadius: 1 }} /></div>
                <div className="modify">
                    <Skeleton variant="rectangular" width={90} height={17} sx={{ mb: .3, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" width={50} height={17} sx={{ borderRadius: 1 }} />
                </div>
                <div className="share">
                    <div className="circleholder">
                        <Skeleton className="circles" variant="circle" />
                        <Skeleton className="circles" variant="circle" />
                        <Skeleton className="circles" variant="circle" />
                    </div>
                </div>
                <div className="favorite">
                    <Skeleton variant="star" className="star" type="checkbox" title="bookmark page" sx={{ mt: 6 }} />
                </div>
            </div>
        </>
    );
};

export default FileSkeleton;