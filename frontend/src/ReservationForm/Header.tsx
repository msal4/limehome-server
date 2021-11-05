export const Header: React.FC = ({ children }) => {
  return (
    <h1
      className="pb-2 mb-2 text-2xl font-bold text-gray-700"
      style={{ borderBottom: "1px solid #11111122" }}
    >
      {children}
    </h1>
  );
};
