const genshinApiUrl = "https://genshin.dev";//link para la api

//objeto donde vamos a contener los datos a mostrar
const libro = () =>{

    const perDataElements ={
        weapon: document.getElementById("personajeWeapon"),
        nation: document.getElementById("personajeNation"),
        affiliation: document.getElementById("personajeAffiliation"),
        rarity: document.getElementById("personajeRarity"),
        birthday: document.getElementById("personajeBirthday"),
        constellation: document.getElementById("personajeConstellation"),
    };
    //referencia para poder cambiar el css con cada tipo de vision
    let currentVision = null;

    const imageTemplate = "<img class='perdisplay' src='{imgSrc}' alt='perdisplay'/>";
    //imagees para errores o loading
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
        perIdElement: document.getElementById("perId")
    };

    const buttons = {
        all: Array.from(document.getElementsByClassName("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };

    const perInput = document.getElementById("perName");

    const processPerVision = (perData) => {
        let perVision = "";
        // Utilizo la primera clase para dar el color a los contenedores de movimientos y habilidades
        const firstClass = perData.types[0].type.name;

        perData.types.forEach((perVisionData) => {
            // Se crea una etiqueta de clases por cada elemento type del arreglo
            perVision += `<span class="per-vision ${perVisionData.type.name}">${perVisionData.type.name}</span>`;
        });
        // Se quita la clase previa del contenedor de habilidades y movimientos si hay una
        if (currentVision) {
            containers.perSkillTalents.classList.remove(currentVision);
            containers.perPassiveTalents.classList.remove(currentVision);
            containers.perConstellations.classList.remove(currentVision);

        }
        // Se agrega la clase del tipo del contenedor de habilidades y movimientos
        containers.perSkillTalents.classList.add(firstClass);
        containers.perPassiveTalents.classList.add(firstClass);
        containers.perConstellations.classList.add(firstClass);
        currentVision = firstClass;
        // Se agregan las etiquetas creadas previamente en nuestro forEach
        containers.perVisionContainer.innerHTML = perVision;
    };

    const processPerData = (perDatas) => {

        perDatas.stats?.forEach((perData) => {
            // Evalua el nombre de la estadística, y coloca su valor en su respectivo contenedor, y le aplica un
            // estilo de gradiente, para hacer más visual el efecto.
            switch (perData.stat.name) {
                case "weapon":
                    const weaponType = perData.weapon_type.toLowerCase();
                    const weaponImgUrl = `https://genshin.dev/weapons/${weaponType}/icon.png`;
                    perDataElements.weapon.innerHTML = `<img src="${weaponImgUrl}" alt="${perData.weapon}" width="32" height="32"> ${perData.weapon}`;
                    break;

                case "nation":
                    const nationKey = perData.nation.toLowerCase();
                    const nationImgUrl = `https://genshin.dev/nations/${nationKey}/icon.png`;
                    perDataElements.nation.innerHTML = `<img src="${nationImgUrl}" alt="${perData.nation}" width="32" height="32"> ${perData.nation}`;
                    break;

                case "affiliation":
                    perDataElements.affiliation.innerHTML = perData.affiliation;
                    break;

                case "rarity":
                    const stars = "🟆".repeat(perData.rarity);
                    perDataElements.rarity.innerHTML = `${stars} (${perData.rarity})`;
                    break;

                case "birthday":
                    perDataElements.birthday.innerHTML = perData.birthday !== "0000-00-00"
                            ? perData.birthday
                            : "Sin registro";
                    break;

                case "constellation":
                    perDataElements.constellation.innerHTML = perData.constellation;
                    break;
            }
        });
    };

    const processPerSkillTalents = (perData) => {
        let perSkillTalentsContent = "";
        perData.skillTalents?.forEach((perSkillTalents) => {
            perSkillTalentsContent += `<li>${perSkillTalents.skillTalents.name}</li>`;
        });
        containers.perSkillTalentsElement.innerHTML = perSkillTalentsContent;
    };

    const processPerPassiveTalents = (perData) => {
        let perPassiveTalentsContent = "";
        perData.passiveTalents?.forEach((perPassiveTalents) => {
            perPassiveTalentsContent += `<li>${perPassiveTalents.passiveTalents.name}</li>`;
        });
        containers.perPassiveTalentsElement.innerHTML = perPassiveTalentsContent;
    };

    const processPerConstellations = (perData) => {
        let perConstellationsContent = "";
        perData.constellations?.forEach((perConstellations) => {
            perConstellationsContent += `<li>${perConstellations.constellations.name}</li>`;
        });
        containers.perConstellationsElement.innerHTML = perConstellationsContent;
    };
//cargar las imagenes
    const setLoading = () => {
        containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disabled = true);
    };
    // Vuelve a habilitar los botones
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };
    
    const getPokemonData = async (pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((res) => res.json())
        .catch((error) => ({requestFailed: true}));
    
    const checkDisabled = (button) => {
        button.disabled = button.id === "btnDown" && +containers.perIdElement.value <= 1;
    };

    const setPersonajeData = async (perName) => {
        if (perName) {
            setLoading();

            const perDatas = await getPersonajeData(typeof perName === typeof "" ? perName.toLowerCase() : perName);
            if (perDatas.requestFailed) {
                // Si no se encontró el pokemon, se pone la imagen de no encontrado
                containers.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPerNotFound);
            } else {
                // Pone las imágenes del pokemon, su nombre y el ID del pokemon
                containers.imageContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", perDatas.sprites.front_default)}
                `;
                containers.pokemonNameElement.innerHTML = pokemonData.name;
                containers.pokemonIdElement.value = pokemonData.id;
                // reparte el resto de procesamientos pertinentes a cada función
                processPokemonTypes(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
            // vuelve a habilitar los botones.
            setLoadingComplete();
        } else {
            // Esta es la forma de utilizar SweetAlert 2, por si te interesa aprender más sobre su uso puedes revisar su
            // sitio oficial https://sweetalert2.github.io/ pero no es necesario.
            Swal.fire({
                title: "Error!",
                text: "Ingresa el nombre de un pokémon primero",
                icon: "error",
                confirmButtonText: "Aceptar.",
            });
        }
    };

};
