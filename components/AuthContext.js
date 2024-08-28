import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  

  const deletePlant = async (plantId, onDeletePlant) => {
    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/delete/tanaman/${plantId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Plant deleted successfully");
        if (onDeletePlant) onDeletePlant(plantId); 
        return true;
      } else {
        console.error("Failed to delete plant");
        return false;
      }
    } catch (error) {
      console.error("Error deleting plant:", error);
      return false;
    }
  };
  
  const deleteKaryawan = async (karyawanId, onDeleteKaryawan) => {
    try {
      const response = await fetch(
        `https://smart-farming-mu5mgd7zh-alifians-projects-30bb1aa5.vercel.app/api/admin/delete/user/byid/${karyawanId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        console.log("Karyawan deleted successfully");
        if (onDeleteKaryawan) onDeleteKaryawan(karyawanId);
        return true;
      } else {
        console.error("Failed to delete karyawan");
        return false;
      }
    } catch (error) {
      console.error("Error deleting karyawan:", error);
      return false;
    }
  };
  return (
    <AuthContext.Provider value={{ token, setToken, username, setUsername, deletePlant, deleteKaryawan }}>
      {children}
    </AuthContext.Provider>
  );
};



export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
