import serve from "koa-static";

export default function staticServe(path) {
	return serve(path);
}
