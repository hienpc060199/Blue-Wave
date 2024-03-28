import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { firebaseDB, firebaseStorage } from "../setup/firebase";
import { IMission } from "../types/mission";

const missionSample: IMission[] = [
  {
    title: "Khảo sát môi trường",
    address:
      "Khu vực công viên thành phố, P. Phước Long, Quận 5, Thành phố Hồ Chí Minh",
    content: `Tổ chức buổi khảo sát ở một bãi biển về mức độ ô nhiễm của nguồn nước hiện nay, có thể vừa tuyên truyền cho mọi người biết vừa thêm 1 số trò chơi và đổi rác lấy cây xanh , giống như mục tích điểm đổi quà. Ví dụ như 5kg rác đc 1 cây xanh.`,
    mission: "Thu Gom và Xử Lý Rác Thải",
    phoneNumber: "0123 456 789",
    startDate: new Date("January 14, 2024 03:24:00"),
    endDate: new Date("January 17, 2024 03:24:00"),
    score: 50,
    participants: 10,
  },
];

export const uploadImage = async (uri: string) => {
  // It won't upload image if image is not change
  const blob: any = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  const avatarName = "test";
  const fileRef = ref(firebaseStorage, avatarName);
  await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  const avatarUrl = await getDownloadURL(fileRef);
  return { avatarName, avatarUrl };
};

export const createMissions = async () => {
  const missionUpload = missionSample.map(async (mission) => {
    const missionDocRef = doc(collection(firebaseDB, "missions"));
    await setDoc(missionDocRef, {
      ...mission,
      id: missionDocRef.id,
    });
  });
  await Promise.all(missionUpload);
};
