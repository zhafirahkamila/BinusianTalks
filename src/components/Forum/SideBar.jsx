import { MessageSquare, Bookmark } from "lucide-react";

const Sidebar = ({ sidebarView, setSidebarView, savedCount, userPostsCount }) => {
  return (
    <aside className="col-12 col-md-3 sidebar">
      <div
        className={`sidebar-item ${sidebarView === "all" ? "active" : ""}`}
        onClick={() => setSidebarView("all")}
      >
        <MessageSquare size={24} />
        <span>All Talks</span>
      </div>

      <div
        className={`sidebar-item ${sidebarView === "saved" ? "active" : ""}`}
        onClick={() => setSidebarView("saved")}
      >
        <Bookmark size={24} />
        <span>Saved {savedCount > 0 && `(${savedCount})`}</span>
      </div>

      <div
        className={`sidebar-item ${
          sidebarView === "yourTalks" ? "active" : ""
        }`}
        onClick={() => setSidebarView("yourTalks")}
      >
        <MessageSquare size={24} />
        <span>Your Talks {userPostsCount > 0 && `(${userPostsCount})`}</span>
      </div>
    </aside>
  );
};

export default Sidebar;