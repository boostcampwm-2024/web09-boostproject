import { useEffect, useMemo, useState } from 'react';

import BaseWrapper from '@/components/common/BaseWrapper';
import Box from '@/components/common/Box';
import DashBoardHeader from '@/components/common/DashBoardHeader';
import PlaceItem from '@/components/Place/PlaceItem';
import PlaceDetailPanel from '@/components/Place/PlaceDetailPanel';
import SideContainer from '@/components/common/SideContainer';
import ListItemThumbnail from '@/components/common/List/ListItemThumbnail';
import Marker from '@/components/Marker/Marker';
import DeleteMapButton from './DeleteMapButton';
import EditMapButton from './EditMapButton';

import { useStore } from '@/store/useStore';
import { Map } from '@/types';

type MapDetailBoardProps = {
  mapData: Map;
};

const MapDetailBoard = ({ mapData }: MapDetailBoardProps) => {
  const user = useStore((state) => state.user);
  const activePlace = useStore((state) => state.place);
  const moveTo = useStore((state) => state.moveTo);
  const googleMap = useStore((state) => state.googleMap);

  const { title, description, isPublic, thumbnailUrl, pinCount, places } =
    mapData;

  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const customPlace = useMemo(
    () => places.find((place) => place.id === activePlace.id),
    [places, activePlace.id],
  );

  const isOwner = user?.id === mapData.user.id;

  useEffect(() => {
    if (places.length > 0 && googleMap) {
      moveTo(places[0].location.latitude, places[0].location.longitude);
    }
  }, [places, googleMap]);

  return (
    <SideContainer>
      <BaseWrapper position="" top="" left="" className="w-1/2">
        <Box>
          <DashBoardHeader title={title} />
          {isOwner && (
            <div className="flex items-center justify-end gap-1 text-center">
              <EditMapButton text="수정" to={`/edit/map/${mapData.id}`} />
              <p className="text-xs text-c_placeholder_gray">|</p>
              <DeleteMapButton mapId={mapData.id} text="삭제" />
            </div>
          )}

          {mapData.thumbnailUrl.startsWith('https://example') ? (
            <ListItemThumbnail className="h-full w-full" />
          ) : (
            <img
              src={mapData.thumbnailUrl}
              className="h-40 w-40 object-cover"
            ></img>
          )}
          <p className="text-lg font-semibold">지도 소개</p>
          <div className="rounded-md border-[1px] border-gray-100 p-1">
            {description}
          </div>
        </Box>
        <Box className="scrollbar-thumb-rounded-lg min-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500">
          {isOwner && (
            <div className="flex w-full justify-end">
              <EditMapButton
                text="수정"
                to={`/create/map/${mapData.id}`}
                className="w-auto px-2"
              />
            </div>
          )}
          {places && places.length > 0 ? (
            <>
              {places.map((place) => (
                <div key={place.id} onClick={() => setIsSidePanelOpen(true)}>
                  <PlaceItem key={place.id} place={place} isDetailPage={true} />
                  <Marker
                    key={place.google_place_id}
                    position={{
                      lat: place.location.latitude,
                      lng: place.location.longitude,
                    }}
                    category={place.category}
                    title={place.name}
                    color={place.color}
                    description={place.comment}
                    address={place.formed_address}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-lg text-gray-400">등록된 장소가 없습니다.</p>
            </div>
          )}
        </Box>
      </BaseWrapper>
      {isSidePanelOpen && customPlace && (
        <PlaceDetailPanel
          place={customPlace}
          onClosed={() => setIsSidePanelOpen(false)}
        />
      )}
    </SideContainer>
  );
};

export default MapDetailBoard;
