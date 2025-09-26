"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("/users/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setName(data.name);
      })
      .catch((err) => console.error(err));
  }, [router]);

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(null);
  setError(null);

  try {
    const res = await fetch("/users/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) throw new Error("Error actualizando perfil");

    const updated = await res.json();
    setUser(updated);

    // ✅ Mostrar mensaje y redirigir
    setSuccess("Perfil actualizado correctamente ✅");

    setTimeout(() => {
      router.push("/dashboard"); // lo manda al dashboard después de 1.5s
    }, 1500);
  } catch (err: any) {
    setError(err.message || "Error desconocido ❌");
  } finally {
    setLoading(false);
  }
};


  if (!user) return <p className="p-6 text-gray-500">Cargando perfil...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <label className="block">
          <span className="text-gray-700">Nombre</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </label>

        <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
        <p className="text-gray-700"><strong>Creado:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md transition"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
