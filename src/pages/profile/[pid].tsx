import { useEffect, useState } from "react";
import InputCreditDrawer from "@/components/InputCreditDrawer";
import { useRouter } from "next/router";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const { pid } = router.query;

  useEffect(() => {
    if (!pid) return;
    const getUser = async () => {
      const res = await axios.get(`/api/fetch-user/${pid}`);
      setData(res.data);
      setLoading(false);
    };
    getUser();
  }, [pid]);

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center">
      <InputCreditDrawer />
    </div>
  );
}
