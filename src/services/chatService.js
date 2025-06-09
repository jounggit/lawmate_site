// 데모용 더미 응답 (실제 구현 시 제거)
export const getDummyResponse = (query) => {
  // 간단한 키워드 기반 응답
  if (query.includes('계약') || query.includes('계약서')) {
    return {
      recommendation: "계약서는 법적 구속력이 있는 문서입니다. 계약 체결 전에 모든 조항을 꼼꼼히 검토하고, 이해가 되지 않는 부분은 반드시 질문하셔야 합니다. 특히 위약금, 해지 조건, 책임 소재 등의 조항은 주의 깊게 살펴보셔야 합니다.",
      related_laws: [
        { name: "민법 제527조", content: "계약은 청약과 승낙으로 성립한다." },
        { name: "민법 제535조", content: "계약은 당사자의 의사표시가 합치함으로써 성립한다." }
      ],
      related_precedents: [
        { case_number: "대법원 2018다248909", title: "계약 해석에 관한 법리" },
        { case_number: "대법원 2016다248845", title: "약관의 해석에 관한 사례" }
      ]
    };
  } else if (query.includes('임대') || query.includes('전세') || query.includes('월세')) {
    return {
      recommendation: "임대차 계약에서는 계약 기간, 보증금, 월세, 관리비 포함 여부, 원상복구 의무 등을 명확히 확인하셔야 합니다. 특히 주택임대차보호법에 따른 대항력과 우선변제권을 위해 전입신고와 확정일자를 받는 것이 중요합니다.",
      related_laws: [
        { name: "주택임대차보호법 제3조", content: "대항력 등" },
        { name: "주택임대차보호법 제3조의2", content: "확정일자 부여 및 임대차 정보제공 등" }
      ],
      related_precedents: [
        { case_number: "대법원 2019다292222", title: "임대차보증금 반환 청구 사건" }
      ]
    };
  } else if (query.includes('교통사고') || query.includes('사고')) {
    return {
      recommendation: "교통사고 발생 시 가장 먼저 부상자 구호 조치와 2차 사고 예방을 위한 조치를 취해야 합니다. 그 후 경찰에 신고하고, 상대방의 연락처와 보험 정보를 확보하는 것이 중요합니다. 또한 현장 사진과 목격자 정보도 가능한 확보하세요. 보험사에 신속히 사고를 접수하고, 필요시 의료 기록을 잘 보관하는 것이 추후 보상 청구에 도움이 됩니다.",
      related_laws: [
        { name: "도로교통법 제54조", content: "사고발생 시의 조치" },
        { name: "자동차손해배상 보장법 제3조", content: "자동차손해배상책임" }
      ],
      related_precedents: [
        { case_number: "대법원 2020다12345", title: "과실상계 적용 사례" },
        { case_number: "대법원 2019다56789", title: "교통사고 손해배상 범위" }
      ]
    };
  } else if (query.includes('이혼') || query.includes('재산분할') || query.includes('양육권')) {
    return {
      recommendation: "이혼에는 협의이혼과 재판상 이혼이 있습니다. 협의이혼은 양 당사자의 합의로 진행되며, 재판상 이혼은 법원의 판결로 이루어집니다. 재산분할, 양육권, 양육비, 위자료 등의 문제는 가능한 상호 합의를 통해 정하는 것이 좋습니다. 특히 자녀가 있는 경우 양육계획서를 작성하여 제출해야 하며, 자녀의 복리를 최우선으로 고려해야 합니다.",
      related_laws: [
        { name: "민법 제834조", content: "협의상 이혼" },
        { name: "민법 제839조의2", content: "재산분할청구권" },
        { name: "민법 제837조", content: "자의 양육책임" }
      ],
      related_precedents: [
        { case_number: "대법원 2018므2307", title: "양육권 판단 기준" },
        { case_number: "대법원 2017므568", title: "재산분할 범위" }
      ]
    };
  } else {
    return {
      recommendation: "질문하신 내용에 대해 일반적인 법률 정보를 제공해드립니다. 더 구체적인 답변을 원하시면 상황에 대해 자세히 설명해 주시기 바랍니다. 개인의 상황에 따라 법률 해석이 달라질 수 있으므로, 정확한 법률 상담을 위해서는 변호사와의 상담을 권장합니다.",
      related_laws: [],
      related_precedents: []
    };
  }
};