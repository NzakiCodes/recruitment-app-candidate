import * as React from "react";
import { SVGProps } from "react";

const Cancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.17462 7.00015L13.4246 1.75849C13.5815 1.60157 13.6697 1.38874 13.6697 1.16682C13.6697 0.944903 13.5815 0.732074 13.4246 0.575155C13.2677 0.418235 13.0549 0.330078 12.833 0.330078C12.611 0.330078 12.3982 0.418235 12.2413 0.575155L6.99962 5.82515L1.75796 0.575155C1.60104 0.418235 1.38821 0.330078 1.16629 0.330078C0.944372 0.330078 0.731543 0.418235 0.574624 0.575155C0.417704 0.732074 0.329547 0.944903 0.329547 1.16682C0.329547 1.38874 0.417704 1.60157 0.574624 1.75849L5.82462 7.00015L0.574624 12.2418C0.496517 12.3193 0.434522 12.4115 0.392214 12.513C0.349907 12.6146 0.328125 12.7235 0.328125 12.8335C0.328125 12.9435 0.349907 13.0524 0.392214 13.154C0.434522 13.2555 0.496517 13.3477 0.574624 13.4252C0.652093 13.5033 0.74426 13.5653 0.84581 13.6076C0.947359 13.6499 1.05628 13.6717 1.16629 13.6717C1.2763 13.6717 1.38522 13.6499 1.48677 13.6076C1.58832 13.5653 1.68049 13.5033 1.75796 13.4252L6.99962 8.17515L12.2413 13.4252C12.3188 13.5033 12.4109 13.5653 12.5125 13.6076C12.614 13.6499 12.7229 13.6717 12.833 13.6717C12.943 13.6717 13.0519 13.6499 13.1534 13.6076C13.255 13.5653 13.3472 13.5033 13.4246 13.4252C13.5027 13.3477 13.5647 13.2555 13.607 13.154C13.6493 13.0524 13.6711 12.9435 13.6711 12.8335C13.6711 12.7235 13.6493 12.6146 13.607 12.513C13.5647 12.4115 13.5027 12.3193 13.4246 12.2418L8.17462 7.00015Z"
      fill="#63748A"
    />
  </svg>
);
const cancel = Cancel;
export { cancel };