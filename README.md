
# tanstack query
> 비동기 상태 관리 라이브러리
## Dependencies
- React.js (Next.js)
- tanstack query
- 
### 차례
1. 훅
2. 훅 사용방법



## hooks
### useQuery

- Query Keys
- Query Functions
- Enabled
### useMutate
- `get`을 제외한 나머지 
- Mutation Functions
- status

### useQueryClient
- TQ의 여러가지 기능이 포함된 훅
- Query Invalidation


## 용어
### stale
신선하지 않은 데이터(신선하지 않다 = 서버에서 가져온지 오래되었다.)
### fresh
신선한 데이터(서버에서 가져온지 오래되지 않아 같은 요청이 있을때 서버에서 또 가져오지 않아도 된다.)

### inactive
현재 페이지에서 필요없는 쿼리