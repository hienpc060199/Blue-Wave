import React, { useEffect, useState } from "react";
import MissionCard from "./components/MissionCard";
import { IMission } from "../../types/mission";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../../setup/firebase";

type Props = {};

// TODO: Make three Button to filter missions: Happening, Coming, Expired
const Missions = (props: Props) => {
  const [missions, setMissions] = useState<IMission[]>([]);

  const fetchMissions = async () => {
    // TODO: Define type for book
    const queryRes = await getDocs(collection(firebaseDB, "missions"));
    const allMissions: IMission[] = [];
    queryRes.forEach((doc: any) => {
      allMissions.push({ ...doc.data() });
    });
    setMissions(allMissions);
  };

  useEffect(() => {
    fetchMissions();
  }, []);
  return (
    <div style={{ padding: "120px 0" }}>
      {missions.map((missionCard) => {
        return <MissionCard info={missionCard} />;
      })}
    </div>
  );
};

export default Missions;
