// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Berry" width="100" />
     *
     */
    <svg width="160" height="50" viewBox="0 0 249 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_49_10)">
        <path d="M88.4467 34V11.32H87.6867L88.2467 6H92.0067L95.9667 5.96L97.8867 21.08L99.8467 6H107.367V34H101.927V17.28L99.8067 30H96.0067L93.8867 17.28V34H88.4467ZM137.736 34V11.32H136.976L137.536 6H143.176V34H137.736ZM176.508 34V11.32H172.788V6H185.628V11.32H181.948V34H176.508ZM220.481 25.2V28.8C220.481 28.9333 220.548 29 220.681 29H221.841C221.975 29 222.041 28.9333 222.041 28.8L222.081 23.48L217.561 21.52C216.548 21.0667 215.868 20.6 215.521 20.12C215.201 19.64 215.041 18.9067 215.041 17.92V11.4C215.041 9.34667 215.481 7.88 216.361 7C217.241 6.12 218.668 5.68 220.641 5.68H222.321C224.188 5.76 225.521 6.25333 226.321 7.16C227.121 8.04 227.521 9.45333 227.521 11.4V16.4L222.081 15.8V11.2C222.081 11.0667 222.015 11 221.881 11H220.681C220.548 11 220.481 11.0667 220.481 11.2V17.08L225.001 19.04C226.015 19.4667 226.681 19.9333 227.001 20.44C227.348 20.92 227.521 21.6533 227.521 22.64V28.6C227.521 30.5467 227.121 31.9733 226.321 32.88C225.521 33.76 224.188 34.24 222.321 34.32H220.721C218.695 34.32 217.241 33.88 216.361 33C215.481 32.0933 215.041 30.6267 215.041 28.6V25.2H220.481Z" fill="#673AB7" />
        <path d="M96.5095 61.424C96.5095 63.0453 96.1468 64.2187 95.4215 64.944C94.7175 65.648 93.5442 66 91.9015 66H85.8855V47.856H85.2775L85.7255 43.6H91.9015C93.5442 43.6 94.7175 43.952 95.4215 44.656C96.1468 45.36 96.5095 46.5333 96.5095 48.176V61.424ZM91.9975 61.744C92.1042 61.744 92.1575 61.6907 92.1575 61.584V48.016C92.1575 47.9093 92.1042 47.856 91.9975 47.856H90.2375V61.744H91.9975ZM120.625 66V47.856H120.017L120.465 43.6H126.321C127.964 43.6 129.137 43.9627 129.841 44.688C130.567 45.392 130.929 46.5547 130.929 48.176V55.472C130.929 57.1147 130.577 58.288 129.873 58.992L131.857 66H127.505L125.841 60.048H124.977V66H120.625ZM126.417 47.856H124.977V55.792H126.417C126.524 55.792 126.577 55.7387 126.577 55.632V48.016C126.577 47.9093 126.524 47.856 126.417 47.856ZM155.373 66V47.856H154.765L155.213 43.6H159.725V66H155.373ZM186.711 66L183.415 43.6H187.735L190.007 59.536L192.279 43.6H196.599L193.303 66H186.711ZM220.736 66V47.856H220.128L220.576 43.6H229.728L229.472 47.856H225.088V52.656H229.024L228.768 56.912H225.088V61.744H229.728L229.472 66H220.736Z" fill="black" />
      </g>
      <g filter="url(#filter1_d_49_10)">
        <path d="M9.44331 57.9775L12.6185 63.3097C13.2783 64.4322 14.2268 65.3142 15.3402 65.9557L26.6805 46.8721H4C4 48.1149 4.32988 49.3579 4.98968 50.4803L9.44331 57.9775ZM40 24.4208L28.6598 5.33716C27.5464 5.97862 26.5979 6.86063 25.9381 7.9832L4.98968 43.2638C4.34202 44.3622 4.00086 45.606 4 46.8721H26.6805L40 24.4208ZM64.6598 65.9557C65.7731 65.3142 66.7216 64.4322 67.3814 63.3097L68.701 61.1046L75.0103 50.4803C75.6701 49.3579 76 48.1149 76 46.8721H53.3179L58.1443 56.0932L64.6598 65.9557Z" fill="url(#paint0_linear_49_10)" />
        <path d="M40.0001 24.4208L51.3403 5.33719C50.227 4.69573 48.9485 4.375 47.629 4.375H32.3713C31.0517 4.375 29.7733 4.73579 28.66 5.33716L40.0001 24.4208ZM53.3197 46.8721H26.6806L15.3403 65.9557C16.4537 66.5973 17.7321 66.918 19.0517 66.918H60.9485C62.2681 66.918 63.5465 66.5572 64.66 65.9557L53.3197 46.8721ZM64.5362 25.6235L54.062 7.98321C53.4022 6.86064 52.4537 5.97867 51.3403 5.33719L40.0001 24.4208L53.3197 46.8721H75.9589C75.9589 45.6292 75.629 44.3864 74.9692 43.2638L64.5362 25.6235Z" fill="url(#paint1_linear_49_10)" />
      </g>
      <defs>
        <filter id="filter0_d_49_10" x="81.2776" y="5.67999" width="152.45" height="68.32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_49_10" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_49_10" result="shape" />
        </filter>
        <filter id="filter1_d_49_10" x="0" y="0" width="80" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_49_10" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_49_10" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_49_10" x1="40" y1="5.33716" x2="40" y2="65.9557" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8F00FF" stop-opacity="0.78" />
          <stop offset="1" stop-opacity="0.83" />
        </linearGradient>
        <linearGradient id="paint1_linear_49_10" x1="45.6496" y1="4.375" x2="45.6496" y2="66.918" gradientUnits="userSpaceOnUse">
          <stop stop-color="#8F00FF" stop-opacity="0.78" />
          <stop offset="1" stop-opacity="0.83" />
        </linearGradient>
      </defs>
    </svg>


  );
};

export default Logo;
