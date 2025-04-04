const introduction =
    document.getElementById("introduction");
const search_form =
    document.getElementById("search_form");
const search_results =
    document.getElementById("search_results");
const not_found_feedback =
    search_results.querySelector("p");

function hide_sections(...section_elements) 
{
    for (const element of section_elements)
    {
        element.setAttribute("aria-hidden", "true");

        element
            .classList
            .add("not-visible");
    }
}

function show_sections(...section_elements)
{
    for (const element of section_elements)
    {
        element.setAttribute("aria-hidden", "false");

        element
            .classList
            .remove("not-visible");
    }
}

async function fetch_destination_data(keyword)
{
    const response =
        await fetch('/assets/data/travel_recommendation_api.json');

    const json_data =
        await response.json();

    return json_data[ keyword ] ?? [];
}

function get_related_keyword(term)
{
    switch (term)
    {
        case "beach":
            return "beaches";
        case "beaches":
            return "beaches";
        case "country":
            return "countries";
        case "countries":
            return "countries";
        case "temple":
            return "temples";
        case "temples":
            return "temples";
        default:
            return "default";
    }
}

async function get_data(search_term)
{
    /* Get keyword  */
    const search_keyword =
        get_related_keyword(search_term);

    console.log(search_keyword);

    /* Fetch data */
    return await fetch_destination_data(search_keyword);
}

function show_data(data)
{
    const get_template =
        (image_name, destination_name, destination_description) =>
        {
            return (`
                <li class="search_results__list__item">
                    <img 
                        class="search_results__list__item__image"
                        src="/assets/images/destinations/${image_name}"
                        alt="${destination_name} image" 
                        aria-hidden="true"
                    >
                    <p class="search_results__list__item__name">
                        ${destination_name}
                    </p>
                    <p class="search_results__list__item__description">
                        ${destination_description}
                    </p>
                </li>
            `);
        };

    /* Hide introduction section and not found feedback*/
    hide_sections(
        introduction,
        not_found_feedback
    );

    /* Map search results */
    let results = "";
    for (const element of data)
    {
        if (element[ "cities" ])
        {
            for (const city of element[ "cities" ])
            {
                results += get_template(
                    city[ "imageUrl" ],
                    city[ "name" ],
                    city[ "description" ],
                );
            }
        }
        else
        {
            results += get_template(
                element[ "imageUrl" ],
                element[ "name" ],
                element[ "description" ],
            );
        }

    }

    search_results
        .querySelector("ul")
        .innerHTML = results;

    show_sections(search_results);
}

function show_no_results()
{
    search_results
        .querySelector("ul")
        .innerHTML = "";

    hide_sections(introduction);
    show_sections(
        not_found_feedback,
        search_results
    );
}

search_form.onsubmit =
    async (event) =>
    {
        event.preventDefault();

        const search_input =
            document.getElementById('search_input');

        /* Get search term */
        const search_term =
            search_input.value.toLowerCase();

        console.log(search_term);

        /* Get search data */
        const data =
            await get_data(search_term);

        console.log(data);

        /* Show data*/
        if (data.length == 0)
        {
            show_no_results();
        }
        else
        {
            show_data(data);
        }
    };

search_form.onreset =
    () =>
    {
        /* Show introduction section */
        hide_sections(
            search_results,
            not_found_feedback
        );
        show_sections(introduction);
    };