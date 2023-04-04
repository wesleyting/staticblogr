import { useNavigate } from "react-router-dom";

function StopEditing(props) {
  const navigate = useNavigate();

  const handleStopEditing = () => {
    props.setEditingMode(false);
    localStorage.removeItem("editingMode");
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <button
            className="bg-red-500 text-2xl hover:bg-red-700 text-white font-bold py-4 px-6 rounded"
            onClick={handleStopEditing}
          >
            Stop Editing
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default StopEditing;
