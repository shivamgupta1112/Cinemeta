const MovieAPI = {
    catalogUrl: "https://v3-cinemeta.strem.io/catalog/movie/top.json",

    searchUrl: function (query) {
        return "https://v3-cinemeta.strem.io/catalog/movie/top/search=" + encodeURIComponent(query) + ".json";
    },

    posterUrl: function (movie) {
        const poster = movie && movie.poster ? movie.poster : "";
        if (!poster) {
            return "assets/poster.svg";
        }
        if (poster.indexOf("/poster/small/") !== -1) {
            return poster.replace("/poster/small/", "/poster/medium/");
        }
        return poster.replace("SX250", "SX500").replace("SX300", "SX500");
    },

    load: async function (query) {
        const url = query ? this.searchUrl(query) : this.catalogUrl;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not load movies");
        }
        const data = await response.json();
        return (data.metas || []).filter(function (movie) {
            return movie && movie.type === "movie" && movie.name;
        });
    }
};
