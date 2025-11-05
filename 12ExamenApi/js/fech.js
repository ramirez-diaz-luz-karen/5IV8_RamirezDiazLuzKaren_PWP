const genshinApiUrl = "https://genshin.dev";

const libro = () => {
    const perDataElements = {
        weapon: document.getElementById("personajeWeapon"),
        nation: document.getElementById("personajeNation"),
        affiliation: document.getElementById("personajeAffiliation"),
        rarity: document.getElementById("personajeRarity"),
        birthday: document.getElementById("personajeBirthday"),
        constellation: document.getElementById("personajeConstellation"),
    };

    const imageTemplate = "<img class='perdisplay' src='{imgSrc}' alt='perdisplay'/>";
    const images = {
        imgPerNotFound: "./img/404.jpg",
        imgLoading: "./img/loading.jpg",
    };

    const containers = {
        imageContainer: document.getElementById("perdisplay-container"),
        perVisionContainer: document.getElementById("perVision"),
        perNameElement: document.getElementById("perNameResult"),
        perSkillTalentsElement: document.getElementById("perSkillTalents"),
        perPassiveTalentsElement: document.getElementById("perPassiveTalents"),
        perConstellationsElement: document.getElementById("perConstellations"),
    };

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown"),
    };

    const perInput = document.getElementById("perName");

    const processPerVision = (perData) => {
        if (perData.vision) {
            const visionKey = perData.vision.toLowerCase();
            const visionImgUrl = `https://genshin.dev/elements/${visionKey}/icon.png`;
            containers.perVisionContainer.innerHTML = `
                <img src="${visionImgUrl}" alt="${perData.vision}" width="32" height="32">
                <span class="per-vision ${visionKey}">${perData.vision}</span>`;
        } else {
            containers.perVisionContainer.innerHTML = `<span class="per-vision">Desconocido</span>`;
        }
    };

    const processPerData = (perData) => {
        // Weapon
        if (perData.weapon_type) {
            const weaponKey = perData.weapon_type.toLowerCase();
            const weaponImgUrl = `https://genshin.dev/weapons/${weaponKey}/icon.png`;
            perDataElements.weapon.innerHTML = `
                <img src="${weaponImgUrl}" alt="${perData.weapon}" width="32" height="32">
                ${perData.weapon}`;
        } else {
            perDataElements.weapon.innerHTML = "Desconocido";
        }

        // Nation
        if (perData.nation) {
            const nationKey = perData.nation.toLowerCase().replace(/\s+/g, "-");
            const nationImgUrl = `https://genshin.dev/nations/${nationKey}/icon.png`;
            perDataElements.nation.innerHTML = `
                <img src="${nationImgUrl}" alt="${perData.nation}" width="32" height="32">
                ${perData.nation}`;
        } else {
            perDataElements.nation.innerHTML = "Desconocido";
        }

        // Affiliation
        perDataElements.affiliation.innerHTML = perData.affiliation || "Desconocido";

        // Rarity
        const starIcon = `<img src="https://img.icons8.com/ios-filled/50/000000/star--v1.png" width="20" height="20">`;
        perDataElements.rarity.innerHTML = starIcon.repeat(perData.rarity || 0);

        // Birthday
        perDataElements.birthday.innerHTML = perData.birthday !== "0000-00-00" ? perData.birthday : "Sin registro";

        // Constellation
        perDataElements.constellation.innerHTML = perData.constellation || "Desconocido";
    };

    const processPerSkillTalents = (perData) => {
        containers.perSkillTalentsElement.innerHTML = perData.skillTalents
            ?.map((t) => `<li>${t.name}</li>`)
            .join("") || "<li>Sin datos</li>";
    };

    const processPerPassiveTalents = (perData) => {
        containers.perPassiveTalentsElement.innerHTML = perData.passiveTalents
            ?.map((t) => `<li>${t.name}</li>`)
            .join("") || "<li>Sin datos</li>";
    };

    const processPerConstellations = (perData) => {
        containers.perConstellationsElement.innerHTML = perData.constellations
            ?.map((c) => `<li>${c.name}</li>`)
            .join("") || "<li>Sin datos</li>";
    };

    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };

    const setLoadingComplete = () => {
        buttons.all.forEach(button => button.disabled = false);
    };

    const getPersonajeData = async (perName) => {
  try {
    const res = await fetch(`${genshinApiUrl}/characters/${perName.toLowerCase()}`);
    if (!res.ok) throw new Error("No se encontró el personaje");
    return await res.json();
  } catch (error) {
    return { requestFailed: true };
  }
};

    const setPersonajeData = async (perName) => {
        if (!perName) {
            alert("Ingresa el nombre de un personaje primero");
            return;
        }

        if (!personajes.includes(perName.toLowerCase())) {
            alert("Personaje no válido o no encontrado.");
            return;
        }

        setLoading();
        const perDatas = await getPersonajeData(perName);

        if (perDatas.requestFailed || perDatas.error) {
            containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPerNotFound);
            containers.perNameElement.textContent = "No encontrado";
            setLoadingComplete();
            return;
        }

        const personajeImgUrl = `https://genshin.dev/characters/${perDatas.name.toLowerCase()}/portrait.png`;
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", personajeImgUrl);
        containers.perNameElement.textContent = perDatas.name;

        processPerVision(perDatas);
        processPerData(perDatas);
        processPerSkillTalents(perDatas);
        processPerPassiveTalents(perDatas);
        processPerConstellations(perDatas);

        setLoadingComplete();
    };

    let personajes = [];
    fetch(`${genshinApiUrl}/characters`)
        .then(res => res.json())
        .then(data => personajes = data);

    const triggers = () => {
        buttons.search.onclick = () => setPersonajeData(perInput.value);

        perInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                setPersonajeData(perInput.value);
            }
        };

        buttons.next.onclick = () => {
            if (!personajes.length) return;
            const index = personajes.indexOf(perInput.value.toLowerCase());
            if (index < personajes.length - 1) {
                const next = personajes[index + 1];
                perInput.value = next;
                setPersonajeData(next);
            }
        };

        buttons.previous.onclick = () => {
            if (!personajes.length) return;
            const index = personajes.indexOf(perInput.value.toLowerCase());
            if (index > 0) {
                const prev = personajes[index - 1];
                perInput.value = prev;
                setPersonajeData(prev);
            }
        };
    };

    setLoadingComplete();
    triggers();
};

window.onload = libro;