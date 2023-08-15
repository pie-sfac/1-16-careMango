import React from 'react';
import { ReactComponent as EmptyAlbum } from '@/assets/icons/EmptyAlbum.svg';

const MemberAlbum = () => (
  <div className="p-10 bg-bg-100">
    <div className="flex items-center justify-center">
      <EmptyAlbum />
    </div>
    <p className="flex items-center justify-center p-3 my-1 base-font text-text-400">앨범이 현재 비어있습니다</p>
  </div>
);

export default MemberAlbum;
