// import React, { useState, useRef } from 'react';
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
// import PlayerCard from '../component/playerCard';

// export default function CSVImporter() {
//   const toast = useRef(null);
//   const [players, setPlayers] = useState([]);
  
//   const onUpload = async (event) => {
//     try {
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: event.files[0],
//       });
      
//       const result = await response.json();
      
//       if (result.teamA && result.teamB) {
//         const playerData = [...result.teamA, ...result.teamB];
//         setPlayers(playerData);
//         toast.current.show({
//           severity: 'success',
//           summary: 'Success',
//           detail: 'CSV File Uploaded and Players Loaded',
//         });
//       } else {
//         toast.current.show({
//           severity: 'error',
//           summary: 'Error',
//           detail: 'Failed to process player data',
//         });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.current.show({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Error uploading file',
//       });
//     }
//   };

//   return (
//     <div className="card flex justify-content-center">
//       <Toast ref={toast}></Toast>
//       <h3>Import from CSV</h3>
//       <FileUpload
//         mode="basic"
//         name="csvFile"
//         url="/api/upload"
//         accept=".csv"
//         maxFileSize={1000000}
//         onUpload={onUpload}
//         chooseLabel="Select CSV"
//         uploadLabel="Upload CSV"
//       />
      
//       {/* Render Player Cards */}
//       <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {players.map((player, index) => (
//           <PlayerCard
//             key={index}
//             name={player.name}
//             points={player.points}
//             bgImage={player.bgImage}
//             profileImage={player.profileImage}
//             teamIconUrl={player.teamIconUrl}
//             team={player.team}
//             isInField={player.isInField}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Button, Input, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../constants';
export default function CSVImporter({ onPlayersLoaded }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [players, setPlayers] = useState({});
  const [alert, setAlert] = useState({
    message: "",
    severity: "",
    show: false,
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setAlert({
        message: "Please select a CSV file first.",
        severity: "error",
        show: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/match/upload_csv`,
        formData
      );

      const result = response.data;

      if (result) {
        setPlayers(result);
      // console.log(result);
        onPlayersLoaded(result); // Pass the players data back to the parent
        setAlert({
          message: "Successfully imported players from the CSV file.",
          severity: "success",
          show: true,
        });
      } else {
        setAlert({
          message: "Failed to retrieve player data. Please check the CSV format.",
          severity: "error",
          show: true,
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setAlert({
        message: "Error uploading file. Please try again.",
        severity: "error",
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setAlert({
      message: "",
      severity: "",
      show: false,
    });
  };

  return (
    <div className="card flex justify-content-center">
      {alert.show && (
        <Alert
          severity={alert.severity}
          sx={{ marginBottom: 2 }}
          onClose={handleAlertClose}
        >
          {alert.message}
        </Alert>
      )}

      <Input
        type="file"
        inputProps={{ accept: ".csv" }}
        onChange={handleFileChange}
        sx={{ marginBottom: 2, backgroundColor: "transparent" }}
      />

      <Button
        variant="contained"
        color="success"
        onClick={handleFileUpload}
        disabled={!selectedFile || loading}
        endIcon={loading ? <CircularProgress size={24} /> : null}
      >
        {loading ? "Importing..." : "Import from CSV"}
      </Button>
    </div>
  );
}
