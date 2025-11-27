"use client";

import { useUser } from "@/hooks/use-auth";

const ProfilePage = () => {
    const { data, isLoading } = useUser();
    console.log(data);
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
export default ProfilePage