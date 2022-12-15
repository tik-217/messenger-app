import React from "react";
import Chat from "./Chat/Chat.tsx";
import Sidebar from "./Sidebar/Sidebar";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div id="snippetContent">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="card chat-app">
              <Sidebar />
              <Chat />
            </div>
          </div>
        </div>
      </div>

      <script type="text/javascript"></script>
    </div>
  )
}