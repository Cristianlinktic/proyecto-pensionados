"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../components/LogoutButton";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/users/me")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Error cargando usuario:", err));
  }, [router]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <LogoutButton />
      </div>

      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-2"><strong>Nombre:</strong> {user.name}</p>
          <p className="text-gray-700 mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700 mb-4"><strong>Creado:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

          <Link href="/me">
            <button className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded-md transition">
              Editar Perfil
            </button>
          </Link>
        </div>
      ) : (
        <p className="text-gray-500">Cargando usuario...</p>
      )}
    </div>
  );
}
