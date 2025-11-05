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
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif",
    };

    const containers = {
        imageContainer: document.getElementById("perdisplay-container"),
        pokemonTypesContainer: document.getElementById("perVision"),
        pokemonNameElement: document.getElementById("perNameResult"),
        pokemonAbilitiesElement: document.getElementById("perSkillTalents"),
        pokemonMovesElement: document.getElementById("perPassiveTalents"),
        pokemonMovesElement: document.getElementById("perConstellations"),
        pokemonIdElement: document.getElementById("perId")
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
            switch (pokemonStatData.stat.name) {
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
            }
        });
    };
    


};
