import React from 'react';
import { BannerProps } from '@/types/home/bannerProps';

const Banner: React.FC<BannerProps> = ({ link, src, alt }) => (
  <li className="w-full h-full">
    <a href={link}>
      <img src={src} alt={alt} className="w-full h-full object-cover object-center" />
    </a>
  </li>
);

export default Banner;
