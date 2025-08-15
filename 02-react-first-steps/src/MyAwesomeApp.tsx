export function MyAwesomeApp() {
  const firstName = "Fernando";
  const lastName = "Herrera";
  const favoriteGames = ["Stray", "NBA"];
  const isActive = true;
  const address = {
    zipCode: "abc-234",
    country: "Canada",
  };

  return (
    <div>
      <h1>{firstName}</h1>
      <h3>{lastName}</h3>
      <p>{favoriteGames.join(", ")}</p>
      <h1 style={{ backgroundColor: isActive ? "#cdb4db" : "#a2d2ff" }}>
        {isActive ? "Activo" : "Inactivo"}
      </h1>
      <p>
        {address.country} - {address.zipCode}
      </p>
      <p style={{ backgroundColor: "#dda15e", borderRadius: 20, padding: 10 }}>
        {JSON.stringify(address)}
      </p>
    </div>
  );
}
