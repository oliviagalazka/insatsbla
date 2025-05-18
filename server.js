import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { extname, join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { contentType } from "https://deno.land/std@0.224.0/media_types/mod.ts";

const handler = async (req) => {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    // Visa index.html för startsidan
    if (pathname === "/") pathname = "/index.html";

    const filePath = join(Deno.cwd(), pathname);
    try {
        const file = await Deno.readFile(filePath);
        const mime = contentType(extname(filePath)) || "application/octet-stream";
        return new Response(file, {
            headers: { "content-type": mime },
        });
    } catch {
        return new Response("404: Not found", { status: 404 });
    }
};

serve(handler, { port: 8000 });