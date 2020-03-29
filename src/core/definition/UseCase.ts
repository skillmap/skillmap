
export default interface UseCase<Request, Response> {
    execute(request: Request): Response | Promise<Response>;
}
