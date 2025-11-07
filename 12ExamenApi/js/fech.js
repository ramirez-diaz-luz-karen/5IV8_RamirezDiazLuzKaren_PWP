const jikanBaseUrl = "https://api.jikan.moe/v4";

const app = () => {
  const elements = {
    input: document.getElementById("animeName"),
    btnSearch: document.getElementById("btnSearch"),
    imgContainer: document.getElementById("animeDisplay"),
    title: document.getElementById("animeTitle"),
    synopsis: document.getElementById("animeSynopsis"),
    genres: document.getElementById("animeGenres"),
    type: document.getElementById("animeType"),
    episodes: document.getElementById("animeEpisodes"),
    season: document.getElementById("animeSeason"),
    score: document.getElementById("animeScore"),
    producers: document.getElementById("animeProducers"),
    recommendations: document.getElementById("animeRecommendations")
  };

  const imageTemplate = (src) => `<img class="anime-img" src="${src}" alt="anime">`;

  const getAnime = async (name) => {
    try {
      const res = await fetch(`${jikanBaseUrl}/anime?q=${encodeURIComponent(name)}&limit=1`);
      const data = await res.json();
      return data.data && data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
      console.error("Error al obtener anime:", error);
      return null;
    }
  };

  const getRecommendations = async (id) => {
    try {
      const res = await fetch(`${jikanBaseUrl}/anime/${id}/recommendations`);
      const data = await res.json();
      return data.data?.slice(0, 5) || [];
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
      return [];
    }
  };

  const renderAnime = async (anime) => {
    if (!anime) {
      elements.imgContainer.innerHTML = imageTemplate("./img/404.jpg");
      elements.title.textContent = "No se encontró el anime o personaje";
      elements.synopsis.textContent = "";
      elements.genres.innerHTML = "";
      return;
    }

    elements.imgContainer.innerHTML = imageTemplate(anime.images.jpg.image_url);
    elements.title.textContent = anime.title;
    elements.synopsis.textContent = anime.synopsis || "Sin descripción disponible.";
    elements.genres.innerHTML = anime.genres.map(g => `<span>${g.name}</span>`).join(" ");
    elements.type.textContent = anime.type || "-";
    elements.episodes.textContent = anime.episodes || "Desconocido";
    elements.season.textContent = anime.season || "N/A";
    elements.score.textContent = anime.score || "N/A";
    elements.producers.textContent = anime.producers.map(p => p.name).join(", ") || "Desconocidos";

    const recs = await getRecommendations(anime.mal_id);
    elements.recommendations.innerHTML = recs.length
      ? recs.map(r => `<li>${r.entry.title}</li>`).join("")
      : "<li>No hay recomendaciones disponibles</li>";
  };

  const search = async () => {
    const name = elements.input.value.trim();
    if (!name) return alert("Ingrese el nombre de un anime o personaje.");

    elements.imgContainer.innerHTML = imageTemplate("./img/loading.jpg");
    const anime = await getAnime(name);
    await renderAnime(anime);
  };

  elements.btnSearch.onclick = search;
  elements.input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") search();
  });
};

window.onload = app;
