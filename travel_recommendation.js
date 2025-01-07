async function fetch_destination_data(keyword) {
    const response = await fetch('./travel_recommendation_api.json');
    const json_data = await response.json();

    return json_data[keyword] ?? [];
}

function get_related_keyword(term) {
    switch (term) {
        case "beach":
            return "beaches";
            break;
        case "beaches":
            return "beaches";
            break;
        case "country":
            return "countries";
            break;
        case "countries":
            return "countries";
            break;
        case "temple":
            return "temples";
            break;
        case "temples":
            return "temples";
            break;
        default:
            return "default";
            break;
    }
}

async function get_data(search_term){
    /* Get keyword  */
    const search_keyword = get_related_keyword(search_term);
    console.log(search_keyword);

    /* Fetch data */
    return await fetch_destination_data(search_keyword);
}

function show_data() {
    
}

const search_form = document.getElementById('search_form');
const search_input = document.getElementById('search_input');

search_form.onsubmit =
    async (event) => {
        event.preventDefault()

        /* Get search term */
        const search_term = search_input.value.toLowerCase();
        console.log(search_term);

        /* Get search data */
        const data = await get_data(search_term);
        console.log(data);

        /* Show data*/
        show_data();
    }