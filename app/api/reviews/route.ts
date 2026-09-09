import { handleReviewRequest } from '../../../backend/worker';
import { reviewStorage } from '../../lib/review-storage';
const handle = (request: Request) => handleReviewRequest(request, reviewStorage());
export const GET = handle;
export const POST = handle;
export const OPTIONS = handle;
