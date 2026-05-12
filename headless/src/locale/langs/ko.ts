import type { LocaleMessages } from '../types';

const ko: LocaleMessages = {
  pagination: {
    firstPage: '첫 페이지',
    prevPage: '이전 페이지',
    nextPage: '다음 페이지',
    lastPage: '마지막 페이지'
  },
  table: {
    emptyTitle: '데이터 없음',
    emptyDescription: '표시할 데이터가 없습니다.',
    selectAllRows: '모든 행 선택',
    sortByColumn: '{column} 기준 정렬',
    sortByColumnAsc: '{column} 기준 정렬, 현재 오름차순',
    sortByColumnDesc: '{column} 기준 정렬, 현재 내림차순',
    resizeColumn: '{column} 열 크기 조정',
    expandRow: '{row}행 펼치기',
    collapseRow: '{row}행 접기',
    selectRow: '{row}행 선택'
  },
  calendar: {
    prevPage: '이전 페이지',
    nextPage: '다음 페이지',
    selectMonth: '월 선택',
    selectYear: '연도 선택'
  },
  layout: {
    toggleSidebar: '사이드바 토글'
  },
  inputNumber: {
    increment: '증가',
    decrement: '감소',
    clear: '값 지우기'
  },
  textarea: {
    clear: '텍스트 영역 지우기'
  },
  tagsInput: {
    addTag: '태그 추가',
    clear: '태그 지우기'
  },
  progress: {
    loading: '로딩 중'
  },
  anchor: {
    nav: '앵커 탐색'
  },
  breadcrumb: {
    nav: '이동 경로'
  },
  stepper: {
    step: '단계 {step}'
  },
  editable: {
    cancel: '취소',
    edit: '편집',
    submit: '저장'
  },
  combobox: {
    clearInput: '입력 지우기',
    noResults: '결과가 없습니다.',
    search: '검색',
    options: '옵션'
  },
  autocomplete: {
    toggleSuggestions: '추천 목록 전환',
    clearInput: '입력 지우기',
    noResults: '결과가 없습니다.'
  },
  command: {
    noResults: '결과가 없습니다.'
  },
  dialog: {
    cancel: '취소',
    confirm: '확인'
  },
  slider: {
    valueN: '총 {total}개 중 {index}번째 값',
    minimum: '최소',
    maximum: '최대'
  },
  password: {
    clearInput: '입력 지우기',
    showPassword: '비밀번호 표시',
    hidePassword: '비밀번호 숨기기'
  },
  date: {
    daySegment: '일,',
    monthSegment: '월,',
    yearSegment: '년,',
    hourSegment: '시,',
    minuteSegment: '분,',
    secondSegment: '초,',
    dayPeriodSegment: '오전/오후,',
    timeZoneSegment: '시간대,',
    empty: '비어 있음',
    placeholder: {
      year: '년',
      month: '월',
      day: '일',
      time: '––'
    }
  }
};

export default ko;
