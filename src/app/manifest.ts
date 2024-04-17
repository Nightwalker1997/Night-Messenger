import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        "name":"Night Screet Chat Room",
        "short_name":"Night",
        "description":"A Place to send and recive messages from your friends.",
        "start_url":"/",
        "scope": ".",
        "dir": "ltr",
        "lang": "en",
        "icons":[
            {
                "src":"/icons/android-chrome-512x512.png",
                "sizes":"512x512",
                "type":"image/png"
            },
            {
                "src":"/icons/android-chrome-192x192.png",
                "sizes":"192x192",
                "type":"image/png"
            },
            {
                "src":"/icons/favicon-32x32.png",
                "sizes":"32x32",
                "type":"image/png"
            },
            {
                "src":"/icons/favicon-16x16.png",
                "sizes":"16x16",
                "type":"image/png"
            }
        ],
        "theme_color":"#ffffff",
        "background_color":"#ffffff",
        "display":"standalone"
    };
}