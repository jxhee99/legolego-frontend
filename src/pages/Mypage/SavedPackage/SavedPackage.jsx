import ListTable from '../../../components/List/ListTable';

const SavedPackage = () => {
  return (
    <div>
      <ListTable>
        <thead>
          <tr>
            <th>상품번호</th>
            <th>제목</th>
            <th>금액</th>
            <th>상태</th>
            <th>결제일</th>
            <th>주문취소</th>
            <th>후기작성</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>베트남으로 떠나요!</td>
            <td>120000</td>
            <td>
              <span>응원 받는 중</span> <span>8/20</span>
            </td>
            <td>2024.06.24</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2</td>
            <td>스위스 자연여행</td>
            <td>120000</td>
            <td>
              <span>여행사 제안 완료</span>
            </td>
            <td>2024.06.24</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </ListTable>
    </div>
  );
};

export default SavedPackage;
