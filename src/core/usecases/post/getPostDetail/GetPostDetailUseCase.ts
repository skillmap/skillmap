import { GetPostDetailRequestDTO } from 'core/usecases/post/getPostDetail/GetPostDetailRequestDTO';
import { GetPostDetailResponseDTO } from 'core/usecases/post/getPostDetail/GetPostDetailResponseDTO';
import UseCase from 'core/definition/UseCase';
import { GetPostDetailDataAdapter } from 'core/usecases/post/getPostDetail/GetPostDetailDataAdapter';
import Result from 'core/definition/Result';
import { PostDetail } from 'core/entities';
import { PostNotFound } from 'core/usecases/post/getPostDetail/GetPostDetailErrors';

export default class GetPostDetailUseCase implements UseCase<GetPostDetailRequestDTO, GetPostDetailResponseDTO>{

    private getPostDetailDataAdapter: GetPostDetailDataAdapter;

    constructor(getPostDetailDataAdapter: GetPostDetailDataAdapter) {
        this.getPostDetailDataAdapter = getPostDetailDataAdapter;
    }


    execute(request: GetPostDetailRequestDTO): GetPostDetailResponseDTO | Promise<GetPostDetailResponseDTO> {
        const { postId } = request;
        const result = this.getPostDetailDataAdapter.getPostDetail(postId);
        if (result) {
            return Result.ok<PostDetail>(result);
        } else {
            return Result.fail<PostNotFound>(new PostNotFound(postId));
        }
    }

}
