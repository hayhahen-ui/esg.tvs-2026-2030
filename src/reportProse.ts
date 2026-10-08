// Toàn bộ văn bản báo cáo mẫu ESG (20 chương) — 3 ngôn ngữ VI/EN/ZH.
// buildExampleReport(lang) dùng rp(lang, key); chỗ có số liệu dùng fill() với {placeholder}.
import type { ReportLang } from "./reportI18n";

const P: Record<string, Record<ReportLang, string>> = {
  // ---------- Tiêu đề ----------
  ex_title: {
    vi: "Báo cáo ESG 2025 — Công ty Giày Minh Họa",
    en: "2025 ESG Report — Minh Hoa Footwear Company",
    zh: "2025年ESG报告——Minh Hoa鞋业公司",
  },
  ex_intro: {
    vi: "Tất cả số liệu, chính sách, khảo sát, tình huống, bằng chứng và quyết định dưới đây được tạo để hướng dẫn biên soạn. Không sao chép thành báo cáo thực tế. Không nhập phụ lục mẫu vào kho dữ liệu thật. Bản 1.0, biên soạn ngày 08/10/2026.",
    en: "All figures, policies, surveys, scenarios, evidence and decisions below are created to guide report preparation. Do not copy into a real report. Do not import the sample appendix into a real data repository. Version 1.0, prepared on 08/10/2026.",
    zh: "以下所有数据、政策、调查、情景、证据与决策均为指导报告编制而虚构。请勿复制为真实报告。请勿将示例附录导入真实数据库。1.0版，编制日期08/10/2026。",
  },

  // ---------- 01 ----------
  ex_01_h: { vi: "01. Hồ sơ báo cáo và quản lý phiên bản", en: "01. Report profile and version control", zh: "01. 报告概况与版本管理" },
  ex_01_p1: {
    vi: "Công ty Giày Minh Họa là pháp nhân hư cấu sản xuất giày tại một nhà máy CS01 trong một khu công nghiệp giả định ở Việt Nam. Không có mã số doanh nghiệp, địa chỉ hoặc chữ ký thật. Kỳ minh họa: 01/01/2025–31/12/2025; năm cơ sở 2024; tần suất hằng năm; đơn vị tiền tệ tỷ đồng nếu không ghi khác. Mọi dẫn chiếu chương là vị trí nội dung, không phải xác nhận đáp ứng tiêu chuẩn.",
    en: "Minh Hoa Footwear Company is a fictional legal entity manufacturing footwear at plant CS01 in a hypothetical industrial zone in Vietnam. There is no real business registration number, address or signature. Illustrative period: 01/01/2025–31/12/2025; base year 2024; annual frequency; monetary unit is VND billion unless stated otherwise. All chapter cross-references indicate content location, not confirmation of standard compliance.",
    zh: "Minh Hoa鞋业公司为虚构法人，在越南某假设工业区内的CS01工厂生产鞋类。无真实企业注册号、地址或签字。示例期间：01/01/2025–31/12/2025；基准年2024；每年发布；货币单位为十亿越南盾（另有说明除外）。所有章节引用仅表示内容位置，不代表符合标准。",
  },
  ex_01_p2: {
    vi: "Mã báo cáo DEMO-ESG-2025-v1.0. Trạng thái: tài liệu đào tạo, không có phê duyệt thật. Vai trò dự kiến: Ban ESG lập, kiểm soát nội bộ soát xét, giám đốc phê duyệt. Khi áp dụng, thay bằng tài khoản, ngày, biên bản và phiên bản dữ liệu thực. Đầu mối phản hồi trong mẫu là vai trò Thư ký Ban ESG, không có email thật.",
    en: "Report code DEMO-ESG-2025-v1.0. Status: training material, with no real approval. Intended roles: ESG Committee prepares, internal control reviews, director approves. In real application, replace with actual accounts, dates, minutes and data versions. The feedback contact in this sample is the role of ESG Committee Secretary; there is no real email.",
    zh: "报告编号DEMO-ESG-2025-v1.0。状态：培训材料，未经真实审批。拟定职责：ESG委员会编制、内控复核、总经理批准。实际应用时请替换为真实账号、日期、会议纪要与数据版本。本示例中的反馈联系人为ESG委员会秘书（角色），无真实邮箱。",
  },
  ex_01_p3: {
    vi: "Mẫu tham khảo cấu trúc GRI và cách kiểm kê của GHG Protocol, không tuyên bố “in accordance with GRI”. Không có assurance độc lập, chứng nhận, kiểm toán báo cáo tài chính hay xác nhận pháp lý. Mẫu này không lấy số liệu của Eclat; bản tham chiếu Eclat 2024 ở cùng màn hình được biên soạn riêng từ nguồn có số trang.",
    en: "This sample references the GRI structure and the GHG Protocol inventory approach; it does not claim to be “in accordance with GRI”. There is no independent assurance, certification, financial audit or legal confirmation. This sample does not use Eclat's figures; the Eclat 2024 reference on the same screen is compiled separately from a paginated source.",
    zh: "本示例参考GRI结构与GHG Protocol核算方法，不声明“符合GRI”。无独立鉴证、认证、财务审计或法律确认。本示例未使用Eclat数据；同屏的Eclat 2024参编版本系根据标明页码的来源单独编制。",
  },

  // ---------- 02 ----------
  ex_02_h: { vi: "02. Thông điệp lãnh đạo và tổng quan kết quả", en: "02. Leadership message and results overview", zh: "02. 管理层致辞与业绩总览" },
  ex_02_p1: {
    vi: "Trong tình huống giả định năm 2025, ưu tiên của doanh nghiệp là giảm tài nguyên trên mỗi đôi giày, giảm nguy cơ chấn thương và tăng khả năng truy xuất nhà cung cấp. Sản lượng tăng 20%, trong khi điện mua giảm 16,67% và nước lấy giảm 10%. Đây là chênh lệch số liệu giả định, chưa phải kết quả đo lường tác động của riêng một dự án.",
    en: "In the hypothetical 2025 scenario, the company's priorities are to reduce resources per pair of shoes, reduce injury risk and improve supplier traceability. Output rose 20%, while purchased electricity fell 16.67% and water withdrawal fell 10%. These are illustrative data variances, not measured impact results of any single project.",
    zh: "在2025年假设情景中，企业的优先事项是降低单位产品资源消耗、降低工伤风险并提高供应商可追溯性。产量增长20%，购电量下降16.67%，取水量下降10%。以上为示例数据差异，并非某一项目的实测影响结果。",
  },
  ex_02_p2: {
    vi: "Doanh nghiệp vẫn còn thiếu dữ liệu Scope 2 theo thị trường, phần lớn chuỗi giá trị Scope 3, một số chỉ tiêu nhân quyền và quản trị. Lãnh đạo trong kịch bản lựa chọn công khai khoảng trống và giao trách nhiệm bổ sung, thay vì biến dữ liệu chưa có thành số 0. Không có tuyên bố Net Zero hay trung hòa carbon.",
    en: "The company still lacks market-based Scope 2 data, most of the Scope 3 value chain, and some human-rights and governance indicators. In this scenario, leadership chooses to disclose gaps publicly and assign follow-up responsibilities, rather than turning missing data into zeros. There is no Net Zero or carbon-neutrality claim.",
    zh: "企业仍缺失市场法范围二数据、范围三价值链大部分数据以及部分人权与治理指标。在本情景中，管理层选择公开披露缺口并明确后续责任，而不是将缺失数据记为零。不作净零或碳中和声明。",
  },
  ex_02_th: { vi: "Chỉ tiêu|2024|2025|Nhận xét", en: "Indicator|2024|2025|Remarks", zh: "指标|2024年|2025年|备注" },
  ex_02_c1: { vi: "Sản lượng (đôi)", en: "Output (pairs)", zh: "产量（双）" },
  ex_02_c2: { vi: "Điện (kWh/đôi)", en: "Electricity (kWh/pair)", zh: "电耗（千瓦时/双）" },
  ex_02_c3: { vi: "Nước lấy (lít/đôi)", en: "Water withdrawal (litres/pair)", zh: "取水（升/双）" },
  ex_02_c4: { vi: "Scope 1 + 2 địa điểm (tCO2e)", en: "Scope 1 + 2 location-based (tCO2e)", zh: "范围一+二（区位法）(吨CO₂当量)" },
  ex_02_c5: { vi: "Tỷ suất chấn thương (ca/triệu giờ)", en: "Injury rate (cases/million hours)", zh: "工伤率（例/百万工时）" },
  ex_02_c6: { vi: "Nhà cung cấp được đánh giá", en: "Suppliers assessed", zh: "已评估供应商" },
  ex_02_r1: { vi: "Tăng 20%", en: "Up 20%", zh: "增长20%" },
  ex_02_r3: { vi: "Giảm 25%", en: "Down 25%", zh: "下降25%" },
  ex_02_r5: { vi: "3 ca / 2,4 triệu giờ trong năm 2025", en: "3 cases / 2.4 million hours in 2025", zh: "2025年3例/240万工时" },
  ex_02_r6: { vi: "Chưa phủ 20 nhà cung cấp", en: "20 suppliers not yet covered", zh: "尚有20家供应商未覆盖" },
  ex_02_r2_prefix: { vi: "Biến động", en: "Change", zh: "变动" },
  ex_02_r4_suffix: { vi: "hệ số giả định", en: "illustrative factors", zh: "假设系数" },

  // ---------- 03 ----------
  ex_03_h: { vi: "03. Doanh nghiệp, cơ sở và chuỗi giá trị", en: "03. Company, sites and value chain", zh: "03. 企业、厂区与价值链" },
  ex_03_p1: {
    vi: "Nhà máy CS01 cắt, may, dán và hoàn thiện giày. Sản lượng 2025 là {pairs} đôi thành phẩm đạt chuẩn, không tính bán thành phẩm hay đôi bị loại. Có {emp} nhân viên tại 31/12/2025 và 40 lao động dịch vụ nhà thầu; hai nhóm được báo cáo tách biệt. Không có công ty con hoặc cơ sở khác trong tình huống.",
    en: "Plant CS01 cuts, sews, bonds and finishes footwear. 2025 output was {pairs} conforming finished pairs, excluding semi-finished goods and rejects. There were {emp} employees at 31/12/2025 plus 40 contractor service workers; the two groups are reported separately. There are no subsidiaries or other sites in this scenario.",
    zh: "CS01工厂从事裁断、缝制、粘合与成品整理。2025年产量为{pairs}双合格成品鞋，不含半成品与次品。截至31/12/2025有{emp}名员工，另有40名承包商服务人员；两类人员分别报告。本情景中无子公司或其他厂区。",
  },
  ex_03_p2: {
    vi: "Chuỗi giá trị gồm nhà cung cấp vải/cao su/keo/bao bì → nhà máy → vận tải thuê ngoài → khách hàng → sử dụng và cuối vòng đời. Mua hàng từ 100 nhà cung cấp hoạt động trong năm; sản lượng của bên gia công ngoài không nằm trong mẫu số sản xuất CS01. Tác động chuỗi cung ứng được nhận diện nhưng dữ liệu ngoài nhà máy chưa đầy đủ.",
    en: "The value chain comprises fabric/rubber/adhesive/packaging suppliers → plant → outsourced transport → customers → use and end of life. Purchasing covered 100 active suppliers during the year; output from external processors is excluded from the CS01 production denominator. Supply-chain impacts are identified, but data outside the plant is incomplete.",
    zh: "价值链包括面料/橡胶/胶水/包装供应商→工厂→外包运输→客户→使用与废弃。年度内向100家活跃供应商采购；外发加工产量不计入CS01生产分母。供应链影响已识别，但厂外数据尚不完整。",
  },
  ex_03_p3: {
    vi: "Vật liệu đầu vào 2025 là {mat} tấn, trong đó {rmat} tấn có hàm lượng tái chế theo giả định xác nhận vật liệu. Tỷ lệ theo khối lượng là {rpct}%, so với 20% năm 2024. Chỉ tiêu này không chứng minh 24% mỗi sản phẩm được tái chế; chưa có phân bổ cấp mã hàng hoặc hồ sơ nguồn gốc thật.",
    en: "2025 material input was {mat} tonnes, of which {rmat} tonnes had recycled content under the illustrative material confirmation. The mass-based ratio is {rpct}%, versus 20% in 2024. This indicator does not prove that 24% of each product is recycled; there is no SKU-level allocation or real chain-of-custody documentation.",
    zh: "2025年材料投入为{mat}吨，其中{rmat}吨按示例材料确认含有再生组分。按质量计算的比例为{rpct}%，2024年为20%。该指标不能证明每件产品含24%再生材料；尚无单品分摊或真实产销监管链文件。",
  },

  // ---------- 04 ----------
  ex_04_h: { vi: "04. Phương pháp, ranh giới và chất lượng dữ liệu", en: "04. Methodology, boundaries and data quality", zh: "04. 方法、边界与数据质量" },
  ex_04_p1: {
    vi: "Ranh giới tổ chức dùng cách tiếp cận kiểm soát vận hành cho CS01. Mọi bảng so sánh nhà máy dùng cùng kỳ, phạm vi và năm cơ sở. Dữ liệu 2024 được tạo theo cùng phương pháp; không có điều chỉnh số liệu nền trong kịch bản. Khi áp dụng thực tế cần chính sách tính lại năm cơ sở và công bố điều chỉnh theo mức độ ảnh hưởng.",
    en: "The organizational boundary uses the operational-control approach for CS01. All plant comparison tables use the same period, scope and base year. The 2024 data was generated with the same methodology; there is no baseline restatement in this scenario. In real application, a base-year recalculation policy is needed, with adjustments disclosed by materiality.",
    zh: "组织边界对CS01采用运营控制法。所有工厂对比表使用相同的报告期、范围与基准年。2024年数据按同样方法生成；本情景中未重算基准数据。实际应用时需制定基准年重算政策，并按重要性披露调整。",
  },
  ex_04_p2: {
    vi: "Điện, nhiên liệu, nước, sản lượng là bộ dữ liệu tháng giả định đủ 12/12 tháng. Nhân viên là số cuối kỳ, không cộng 12 tháng. Cường độ dùng tổng tử chia tổng mẫu. Tổng chất thải có phân loại; nước tiêu thụ là ước tính từ cân bằng. Mỗi mã DEMO chỉ minh họa tài liệu cần thu, không có tệp bằng chứng thật.",
    en: "Electricity, fuel, water and output are illustrative monthly datasets covering 12/12 months. Headcount is a year-end figure, not a 12-month sum. Intensities divide total numerators by total denominators. Total waste is classified; water consumption is estimated from a balance. Each DEMO code only illustrates the documents to collect; there are no real evidence files.",
    zh: "电力、燃料、水与产量为覆盖12/12个月的示例月度数据集。员工数为期末数，非12个月加总。强度指标以总量相除计算。废弃物总量已分类；耗水量由水平衡估算。每个DEMO编码仅示例需收集的文件，无真实证据文件。",
  },
  ex_04_p3: {
    vi: "Các hệ số sau hoàn toàn giả định, không gắn với lưới điện Việt Nam hoặc bộ hệ số chính thức. Trong dữ liệu thật phải xác lập địa lý, năm, công nghệ, khí bao gồm, GWP và nguồn phiên bản.",
    en: "The factors below are entirely hypothetical and are not linked to the Vietnam grid or any official factor set. Real data must establish geography, year, technology, gases included, GWP and the versioned source.",
    zh: "以下系数纯属假设，与越南电网或任何官方系数集无关。真实数据须明确地域、年份、技术、纳入气体、GWP及版本来源。",
  },
  ex_04_th: { vi: "Nguồn|Hệ số giả định|Đơn vị|Công thức", en: "Source|Illustrative factor|Unit|Formula", zh: "来源|假设系数|单位|公式" },
  ex_04_r1: { vi: "Điện mua|0,5|kgCO2e/kWh|kWh × hệ số / 1.000 → tCO2e", en: "Purchased electricity|0.5|kgCO2e/kWh|kWh × factor / 1,000 → tCO2e", zh: "购电|0.5|kgCO₂e/kWh|kWh×系数/1,000→tCO₂e" },
  ex_04_r2: { vi: "Diesel|2,68|kgCO2e/lít|Lít × hệ số / 1.000", en: "Diesel|2.68|kgCO2e/litre|Litres × factor / 1,000", zh: "柴油|2.68|kgCO₂e/升|升×系数/1,000" },
  ex_04_r3: { vi: "LPG|3|kgCO2e/kg|kg × hệ số / 1.000", en: "LPG|3|kgCO2e/kg|kg × factor / 1,000", zh: "液化石油气|3|kgCO₂e/kg|kg×系数/1,000" },
  ex_04_r4: { vi: "Diesel — nhiệt trị|0,036|GJ/lít|Lít × nhiệt trị", en: "Diesel — heating value|0.036|GJ/litre|Litres × heating value", zh: "柴油——热值|0.036|GJ/升|升×热值" },
  ex_04_r5: { vi: "LPG — nhiệt trị|0,046|GJ/kg|kg × nhiệt trị", en: "LPG — heating value|0.046|GJ/kg|kg × heating value", zh: "液化石油气——热值|0.046|GJ/kg|kg×热值" },
  ex_04_r6: { vi: "Điện — quy đổi|0,0036|GJ/kWh|kWh × 0,0036", en: "Electricity — conversion|0.0036|GJ/kWh|kWh × 0.0036", zh: "电力——换算|0.0036|GJ/kWh|kWh×0.0036" },
  ex_04_p4: {
    vi: "Giá trị không được làm tròn từng dòng trước khi tổng hợp. Số trên bảng hiển thị tối đa hai chữ số thập phân; Excel giữ số gốc để tính lại. Thiếu, không áp dụng và số 0 là các trạng thái khác nhau.",
    en: "Values must not be rounded line-by-line before aggregation. Tables display at most two decimal places; Excel retains original figures for recalculation. Missing, not applicable and zero are distinct states.",
    zh: "汇总前不得逐行四舍五入。表格最多显示两位小数；Excel保留原始数值以便重算。缺失、不适用与零是三种不同状态。",
  },

  // ---------- 05 ----------
  ex_05_h: { vi: "05. Tham vấn bên liên quan", en: "05. Stakeholder engagement", zh: "05. 利益相关方参与" },
  ex_05_p1: {
    vi: "Kịch bản giả định gồm khảo sát 240 nhân viên ở các ca, 10 khách hàng, 20 nhà cung cấp và một cuộc họp cộng đồng với 15 đại diện. Các con số này minh họa quy mô tham vấn, không phải khảo sát đã thực hiện. Tỷ lệ đại diện nhân viên khảo sát là 20% nhân viên cuối kỳ, chưa chứng minh mẫu ngẫu nhiên hay đại diện thống kê.",
    en: "The hypothetical scenario includes a survey of 240 employees across shifts, 10 customers, 20 suppliers and one community meeting with 15 representatives. These figures illustrate the scale of engagement, not surveys actually conducted. Surveyed employees represent 20% of year-end headcount, which does not demonstrate random or statistically representative sampling.",
    zh: "假设情景包括对240名各班次员工、10家客户、20家供应商的调查，以及一场15名代表参加的社区座谈。这些数字示例参与规模，并非已开展的调查。受访员工占期末员工的20%，不能证明抽样随机或具有统计代表性。",
  },
  ex_05_p2: {
    vi: "Nhân viên ưu tiên an toàn, nhiệt tại xưởng và tính minh bạch giờ làm; khách hàng ưu tiên hóa chất, truy xuất và phát thải; cộng đồng ưu tiên nước thải. Ban ESG trong kịch bản ghi nhận nội dung, phản hồi bằng kế hoạch và rà lại hằng quý. Nhóm lao động nhà thầu và người ở ca đêm chưa được tham vấn đầy đủ, được đưa vào kế hoạch 2026.",
    en: "Employees prioritized safety, workshop heat and working-hours transparency; customers prioritized chemicals, traceability and emissions; the community prioritized wastewater. In this scenario the ESG Committee records the inputs, responds with plans and reviews quarterly. Contractor workers and night-shift staff were not yet fully consulted and are included in the 2026 plan.",
    zh: "员工关注安全、车间高温与工时透明；客户关注化学品、可追溯性与排放；社区关注废水。在本情景中，ESG委员会记录意见，以计划回应并每季度复核。承包商工人与夜班人员尚未充分参与，已纳入2026年计划。",
  },
  ex_05_p3: {
    vi: "Kênh phản ánh gồm hộp thư nội bộ, đại diện người lao động và đầu mối nhân sự. Chính sách giả định yêu cầu bảo mật, không trả đũa, phản hồi ban đầu trong 5 ngày làm việc và theo dõi kết quả. Không công khai thông tin người phản ánh trong báo cáo.",
    en: "Grievance channels include an internal mailbox, worker representatives and an HR contact. The hypothetical policy requires confidentiality, non-retaliation, an initial response within 5 working days and outcome follow-up. Whistleblower identities are not disclosed in the report.",
    zh: "申诉渠道包括内部信箱、员工代表与人事联系人。假设政策要求保密、不报复、5个工作日内初步回应并跟踪结果。报告中不公开申诉人信息。",
  },

  // ---------- 06 ----------
  ex_06_h: { vi: "06. Chủ đề trọng yếu và cách quản lý", en: "06. Material topics and management approach", zh: "06. 实质性议题与管理方法" },
  ex_06_p1: {
    vi: "Thang ưu tiên nội bộ 1–5 xét mức nghiêm trọng, phạm vi, khả năng khắc phục và khả năng xảy ra đối với tác động tiềm tàng. Nhóm ESG dùng hồ sơ vận hành và ý kiến tham vấn, sau đó lãnh đạo phê duyệt danh sách trong tình huống. Không áp dụng một phép cộng điểm như điều kiện bắt buộc của GRI; tác động nhân quyền nghiêm trọng được ưu tiên ngay cả khi khó đo.",
    en: "The internal 1–5 priority scale considers severity, scope, remediability and likelihood for potential impacts. The ESG team used operational records and consultation inputs, after which leadership approved the list in this scenario. No additive scoring is applied as a mandatory GRI condition; severe human-rights impacts are prioritized even when hard to measure.",
    zh: "内部1–5分优先等级考虑潜在影响的严重程度、范围、可补救性与发生可能性。ESG小组依据运营记录与征询意见拟定清单，再由管理层在情景中批准。不采用加分制作为GRI的强制条件；严重人权影响即使难以量化也优先处理。",
  },
  ex_06_th: { vi: "Chủ đề|Tác động / đối tượng|Quản lý và trách nhiệm|Hiệu lực / khoảng trống", en: "Topic|Impact / affected party|Management and responsibility|Effectiveness / gaps", zh: "议题|影响/受影响方|管理与职责|成效/缺口" },
  ex_06_t1: { vi: "Năng lượng và khí hậu", en: "Energy and climate", zh: "能源与气候" },
  ex_06_t1_i: { vi: "Phát thải và phụ thuộc điện của nhà máy/chuỗi giá trị", en: "Emissions and electricity dependence of the plant/value chain", zh: "工厂/价值链的排放与用电依赖" },
  ex_06_t1_m: { vi: "Cơ điện: tối ưu máy nén, đo điện; EHS: kiểm kê", en: "Utilities: compressor optimization, metering; EHS: inventory", zh: "动力：空压机优化、用电计量；EHS：核算" },
  ex_06_t1_e: { vi: "Điện/đôi giảm; Scope 3 còn thiếu", en: "Electricity/pair down; Scope 3 still missing", zh: "单位电耗下降；范围三仍缺失" },
  ex_06_t2: { vi: "Nước và nước thải", en: "Water and wastewater", zh: "水与废水" },
  ex_06_t2_i: { vi: "Sử dụng tài nguyên, ảnh hưởng nơi nhận nước", en: "Resource use; impacts on receiving waters", zh: "资源使用、对纳污水体的影响" },
  ex_06_t2_m: { vi: "EHS: theo dõi đồng hồ, quan trắc và sự cố", en: "EHS: meter tracking, monitoring and incidents", zh: "EHS：水表跟踪、监测与事件管理" },
  ex_06_t2_e: { vi: "Nước/đôi giảm; stress nước chưa xác minh", en: "Water/pair down; water stress unverified", zh: "单位水耗下降；水压力未核实" },
  ex_06_t3: { vi: "Chất thải và hóa chất", en: "Waste and chemicals", zh: "废弃物与化学品" },
  ex_06_t3_i: { vi: "Sức khỏe nhân viên, chất thải tới bên nhận", en: "Worker health; waste reaching receivers", zh: "员工健康、废弃物去向" },
  ex_06_t3_m: { vi: "Kho/EHS: SDS, phân loại, đối chiếu chứng từ", en: "Warehouse/EHS: SDS, classification, document reconciliation", zh: "仓储/EHS：SDS、分类、单据核对" },
  ex_06_t3_e: { vi: "75% khối lượng chuyển tái chế; tồn kho hóa chất cần rà soát", en: "75% of mass diverted to recycling; chemical stock needs review", zh: "75%转回收利用；化学品库存待排查" },
  ex_06_t4: { vi: "An toàn lao động", en: "Occupational safety", zh: "职业安全" },
  ex_06_t4_i: { vi: "Chấn thương thực tế ở nhân viên", en: "Actual injuries among employees", zh: "员工实际工伤" },
  ex_06_t4_m: { vi: "EHS/nhân sự: điều tra, che chắn, đào tạo", en: "EHS/HR: investigation, guarding, training", zh: "EHS/人事：调查、防护、培训" },
  ex_06_t4_e: { vi: "3 ca; chưa đủ dữ liệu nhà thầu", en: "3 cases; contractor data insufficient", zh: "3例；承包商数据不足" },
  ex_06_t5: { vi: "Điều kiện lao động và nhân quyền", en: "Working conditions and human rights", zh: "劳动条件与人权" },
  ex_06_t5_i: { vi: "Giờ làm, đối xử, tự do hiệp hội ở nhân viên/nhà cung cấp", en: "Working hours, treatment, freedom of association for employees/suppliers", zh: "员工/供应商的工时、待遇、结社自由" },
  ex_06_t5_m: { vi: "Nhân sự/mua hàng: kiểm hồ sơ, phản ánh, đánh giá rủi ro", en: "HR/procurement: file checks, grievances, risk assessment", zh: "人事/采购：档案核查、申诉、风险评估" },
  ex_06_t5_e: { vi: "Chưa có đánh giá lương đủ sống và rủi ro toàn chuỗi", en: "No living-wage assessment or full-chain risk review yet", zh: "尚无体面工资评估与全链风险排查" },
  ex_06_t6: { vi: "Chuỗi cung ứng có trách nhiệm", en: "Responsible supply chain", zh: "负责任供应链" },
  ex_06_t6_i: { vi: "Tác động E/S ở nhà cung cấp", en: "E/S impacts at suppliers", zh: "供应商的环境/社会影响" },
  ex_06_t6_m: { vi: "Mua hàng: đánh giá 80/100, theo CAPA", en: "Procurement: 80/100 assessed, CAPA follow-up", zh: "采购：已评估80/100家，CAPA跟进" },
  ex_06_t6_e: { vi: "20 nhà cung cấp chưa đánh giá, 4 CAPA còn mở", en: "20 suppliers unassessed, 4 CAPAs still open", zh: "20家未评估，4项CAPA未关闭" },
  ex_06_t7: { vi: "Đạo đức và dữ liệu", en: "Ethics and data", zh: "道德与数据" },
  ex_06_t7_i: { vi: "Rủi ro khai sai, hối lộ và lộ dữ liệu", en: "Misreporting, bribery and data-leak risks", zh: "虚报、贿赂与数据泄露风险" },
  ex_06_t7_m: { vi: "Pháp chế/kiểm soát: chính sách, phân quyền, duyệt độc lập", en: "Legal/control: policies, segregation of duties, independent approval", zh: "法务/内控：政策、职责分离、独立审批" },
  ex_06_t7_e: { vi: "Thiếu một số công bố quản trị và thẩm định độc lập", en: "Some governance disclosures and independent verification missing", zh: "缺失部分治理披露与独立核查" },
  ex_06_p2: {
    vi: "Các chủ đề trên liên kết mục tiêu chương 08, kết quả chương 09–14 và CAPA chương 16. Rà soát hiệu lực bằng KPI và phản hồi, không chỉ đếm số chính sách được ban hành. Đa dạng sinh học và cuối vòng đời sản phẩm đang sàng lọc; thiếu dữ liệu không có nghĩa là không trọng yếu.",
    en: "These topics link to the chapter 08 targets, chapters 09–14 results and chapter 16 CAPAs. Effectiveness is reviewed through KPIs and feedback, not merely by counting policies issued. Biodiversity and product end-of-life are being screened; missing data does not mean immaterial.",
    zh: "上述议题关联第08章目标、09–14章结果与第16章CAPA。以KPI与反馈评估成效，而非仅统计发布政策数量。生物多样性与产品废弃阶段正在筛查；数据缺失不代表不重要。",
  },

  // ---------- 07 ----------
  ex_07_h: { vi: "07. Quản trị, đạo đức và trách nhiệm ESG", en: "07. Governance, ethics and ESG accountability", zh: "07. 治理、道德与ESG问责" },
  ex_07_p1: {
    vi: "Cơ cấu hư cấu gồm giám đốc điều hành và Ban ESG 7 vai trò: lãnh đạo, EHS, nhân sự, mua hàng, sản xuất, tài chính và kiểm soát nội bộ. Ban họp mỗi quý, chủ dữ liệu kiểm tra tháng, kiểm soát nội bộ soát xét độc lập, giám đốc duyệt báo cáo. Chưa công bố danh tính, giới, tính độc lập, cơ chế đề cử, đánh giá hiệu quả hoặc thù lao của cơ quan quản trị; không coi mô tả này đáp ứng toàn bộ GRI 2.",
    en: "The fictional structure comprises a managing director and a 7-role ESG Committee: leadership, EHS, HR, procurement, production, finance and internal control. The committee meets quarterly, data owners check monthly, internal control reviews independently, and the director approves the report. Identities, gender, independence, nomination mechanisms, effectiveness evaluations and remuneration of the governance body are not disclosed; this description should not be taken as meeting all of GRI 2.",
    zh: "虚构架构包括总经理与7个角色的ESG委员会：管理层、EHS、人事、采购、生产、财务与内控。委员会每季度开会，数据负责人每月核查，内控独立复核，总经理批准报告。未披露治理机构的身份、性别、独立性、提名机制、成效评估或薪酬；本描述不应视为满足GRI 2全部要求。",
  },
  ex_07_p2: {
    vi: "Chính sách giả định có chống hối lộ, khai báo lợi ích, an toàn, nhân quyền, bảo vệ dữ liệu và cơ chế phản ánh. Trong kịch bản, 12 phản ánh lao động được tiếp nhận, 10 xử lý xong và 2 còn mở liên quan giờ làm. “Đã xử lý” chỉ có nghĩa hồ sơ có phản hồi và hành động, chưa thay thế đánh giá mức hài lòng hay hiệu lực dài hạn.",
    en: "The hypothetical policies cover anti-bribery, interest declarations, safety, human rights, data protection and grievance mechanisms. In this scenario, 12 labour grievances were received, 10 resolved and 2 still open relating to working hours. “Resolved” only means the file has a response and actions; it does not replace satisfaction assessment or long-term effectiveness evaluation.",
    zh: "假设政策涵盖反贿赂、利益申报、安全、人权、数据保护与申诉机制。在本情景中，收到12起劳工申诉，10起已处理，2起涉工时问题仍未关闭。“已处理”仅表示档案有回应与行动，不替代满意度评估或长期成效评价。",
  },
  ex_07_p3: {
    vi: "Có 0 vụ hối lộ được xác nhận trong sổ tình huống, nhưng phạm vi tra soát chỉ là các hồ sơ tiếp nhận và đánh giá của Ban ESG. Không suy ra doanh nghiệp hoàn toàn không có hối lộ. 100% cán bộ mua hàng trong nhóm giả định 20 người hoàn thành đào tạo chống hối lộ; chưa có dữ liệu về tổng nhân viên hoặc nhà cung cấp được truyền đạt chính sách.",
    en: "There were 0 confirmed bribery cases in the scenario log, but the review scope covered only the files received and assessed by the ESG Committee. This cannot be taken to mean the company is entirely free of bribery. 100% of procurement staff in the hypothetical 20-person group completed anti-bribery training; there is no data yet on all employees or suppliers reached by the policy.",
    zh: "情景台账中确认的贿赂案件为0，但审查范围仅限ESG委员会受理与评估的档案，不能据此推断企业完全不存在贿赂。假设的20人采购团队100%完成反贿赂培训；尚无覆盖全体员工或供应商的政策传达数据。",
  },

  // ---------- 08 ----------
  ex_08_h: { vi: "08. Nghĩa vụ, rủi ro và mục tiêu", en: "08. Obligations, risks and targets", zh: "08. 义务、风险与目标" },
  ex_08_p1: {
    vi: "Sổ nghĩa vụ minh họa gồm quản lý môi trường, lao động, an toàn, hóa chất và yêu cầu nhãn hàng. Không có tên văn bản, giấy phép hay kết luận pháp lý thật. Pháp chế phải xác định văn bản đang hiệu lực, căn cứ áp dụng, hạn và bằng chứng trước khi công bố tuân thủ. Không có đủ cơ sở để tuyên bố “không vi phạm pháp luật”. Chưa giả định tư cách thành viên hiệp hội.",
    en: "The illustrative obligations register covers environmental management, labour, safety, chemicals and brand labelling requirements. There are no real document names, permits or legal conclusions. Legal must identify the instruments in force, applicability basis, deadlines and evidence before any compliance claim. There is insufficient basis to declare “no legal violations”. Association membership is not assumed.",
    zh: "示例义务清单涵盖环境管理、劳工、安全、化学品与品牌标签要求。无真实文件名称、许可证或法律结论。法务须在作出合规声明前确定现行有效文件、适用依据、期限与证据。没有充分依据声明“无违法行为”。未假设协会会员资格。",
  },
  ex_08_p2: {
    vi: "Rủi ro ưu tiên: tăng giá điện, nắng nóng ảnh hưởng người lao động, gián đoạn nước và thiếu thông tin nguyên liệu. Tình huống dùng biện pháp tối ưu thiết bị, quản lý nhiệt, theo dõi nước, đa nguồn cung và lấy dữ liệu nhà cung cấp; chưa có mô hình kịch bản khí hậu hay định lượng rủi ro tài chính.",
    en: "Priority risks: rising electricity prices, heat affecting workers, water disruption and missing material information. The scenario applies equipment optimization, heat management, water tracking, multi-sourcing and supplier data collection; there is no climate-scenario modelling or financial risk quantification yet.",
    zh: "优先风险：电价上涨、高温影响员工、供水中断与原料信息缺失。本情景采取设备优化、热管理、用水跟踪、多源采购与供应商数据收集；尚无气候情景模型或财务风险量化。",
  },
  ex_08_th: { vi: "Mục tiêu nội bộ|Nền 2024|Đích 2025|Kết quả 2025|Kết luận", en: "Internal target|2024 baseline|2025 goal|2025 result|Conclusion", zh: "内部目标|2024基准|2025目标|2025结果|结论" },
  ex_08_r1: { vi: "Điện kWh/đôi|3,6|≤ 3,0|{v}|Đạt trong dữ liệu giả định", en: "Electricity kWh/pair|3.6|≤ 3.0|{v}|Met in illustrative data", zh: "电耗kWh/双|3.6|≤3.0|{v}|示例数据中达成" },
  ex_08_r2: { vi: "Nước lấy lít/đôi|50|≤ 40|{v}|Đạt", en: "Water withdrawal litres/pair|50|≤ 40|{v}|Met", zh: "取水升/双|50|≤40|{v}|达成" },
  ex_08_r3: { vi: "Chất thải chuyển tái chế|{b}%|≥ 75%|75%|Đạt, cần chứng từ xử lý thật", en: "Waste diverted to recycling|{b}%|≥ 75%|75%|Met; real treatment documents needed", zh: "废弃物转回收利用|{b}%|≥75%|75%|达成，需真实处置凭证" },
  ex_08_r4: { vi: "Nhà cung cấp được đánh giá|60%|≥ 90%|80%|Chưa đạt, thiếu 10 điểm phần trăm", en: "Suppliers assessed|60%|≥ 90%|80%|Not met, 10 percentage points short", zh: "已评估供应商|60%|≥90%|80%|未达成，差10个百分点" },
  ex_08_r5: { vi: "Số chấn thương ghi nhận|5|≤ 2|3|Chưa đạt, không che giấu ca", en: "Recorded injuries|5|≤ 2|3|Not met; no cases concealed", zh: " recorded工伤|5|≤2|3|未达成，未隐瞒案例" },
  ex_08_p3: {
    vi: "Các mục tiêu là quyết định minh họa, không được tổ chức thẩm định khí hậu. Không dùng mục tiêu cường độ để tuyên bố giảm tuyệt đối nếu tổng phát thải tăng.",
    en: "These targets are illustrative decisions, not climate-validated by any organization. Intensity targets must not be used to claim absolute reductions when total emissions rise.",
    zh: "这些目标为示例性决策，未经任何机构气候核证。当排放总量上升时，不得用强度目标宣称绝对减排。",
  },

  // ---------- 09 ----------
  ex_09_h: { vi: "09. Môi trường — năng lượng và khí nhà kính", en: "09. Environment — energy and greenhouse gases", zh: "09. 环境——能源与温室气体" },
  ex_09_p1: {
    vi: "Điện mua năm 2025 là {kwh} kWh, diesel {d} lít và LPG {l} kg. Không có năng lượng tự sản xuất hoặc bán trong kịch bản. Nguồn điện chưa có hồ sơ xác nhận tái tạo; không tuyên bố tỷ lệ điện tái tạo. Tổng năng lượng quy đổi là {gj} GJ, so với {gj24} GJ năm 2024; chỉ phản ánh năng lượng trong CS01.",
    en: "Purchased electricity in 2025 was {kwh} kWh, diesel {d} litres and LPG {l} kg. There is no self-generated or sold energy in this scenario. The electricity source has no renewable confirmation records; no renewable share is claimed. Total converted energy is {gj} GJ versus {gj24} GJ in 2024; this reflects energy within CS01 only.",
    zh: "2025年购电{kwh} kWh、柴油{d}升、液化石油气{l} kg。本情景无自发电或售电。电力来源无可再生确认记录；不宣称可再生电力比例。折算能源总量为{gj} GJ，2024年为{gj24} GJ；仅反映CS01范围内的能源。",
  },
  ex_09_th: { vi: "Kiểm kê minh họa|2024 tCO2e|2025 tCO2e|Cách tính 2025", en: "Illustrative inventory|2024 tCO2e|2025 tCO2e|2025 calculation", zh: "示例核算|2024年tCO₂e|2025年tCO₂e|2025年算法" },
  ex_09_r1: { vi: "Diesel — Scope 1|160,8|128,64|48.000 × 2,68 / 1.000", en: "Diesel — Scope 1|160.8|128.64|48,000 × 2.68 / 1,000", zh: "柴油——范围一|160.8|128.64|48,000×2.68/1,000" },
  ex_09_r2: { vi: "LPG — Scope 1|120|108|36.000 × 3 / 1.000", en: "LPG — Scope 1|120|108|36,000 × 3 / 1,000", zh: "液化石油气——范围一|120|108|36,000×3/1,000" },
  ex_09_r3: { vi: "Tổng Scope 1|{a}|{b}|Cộng hai nguồn trên", en: "Total Scope 1|{a}|{b}|Sum of the two sources above", zh: "范围一合计|{a}|{b}|以上两项加总" },
  ex_09_r4: { vi: "Scope 2 địa điểm|{a}|{b}|6.000.000 × 0,5 / 1.000", en: "Scope 2 location-based|{a}|{b}|6,000,000 × 0.5 / 1,000", zh: "范围二（区位法）|{a}|{b}|6,000,000×0.5/1,000" },
  ex_09_r5: { vi: "Scope 1 + Scope 2 địa điểm|{a}|{b}|236,64 + 3.000", en: "Scope 1 + Scope 2 location-based|{a}|{b}|236.64 + 3,000", zh: "范围一+范围二（区位法）|{a}|{b}|236.64+3,000" },
  ex_09_r6: { vi: "Scope 2 thị trường|Thiếu|Thiếu|Chưa có thông tin hợp đồng/công cụ đáp ứng chất lượng", en: "Scope 2 market-based|Missing|Missing|No contract/instrument information meeting quality criteria", zh: "范围二（市场法）|缺失|缺失|无符合质量标准的合同/工具信息" },
  ex_09_p2: {
    vi: "Không có rò rỉ môi chất trong kịch bản tạo dữ liệu; đây là giả định, không phải kết quả kiểm tra thiết bị. Kiểm kê thật phải có danh mục thiết bị và kiểm tra toàn bộ nguồn. Cường độ Scope 1 + 2 địa điểm là {i} kgCO2e/đôi; phép tính chưa làm tròn là 3.236,64 × 1.000 / 2.400.000. Không cộng Scope 2 thị trường vào tổng này.",
    en: "There are no refrigerant leaks in the data-generation scenario; this is an assumption, not an equipment-inspection result. A real inventory needs an equipment register and checks of all sources. Location-based Scope 1 + 2 intensity is {i} kgCO2e/pair; the unrounded calculation is 3,236.64 × 1,000 / 2,400,000. Market-based Scope 2 is not added to this total.",
    zh: "数据生成情景中无制冷剂泄漏；此为假设，非设备检查结果。真实核算需设备清单并核查全部排放源。区位法范围一+二强度为{i} kgCO₂e/双；未四舍五入的算式为3,236.64×1,000/2,400,000。市场法范围二不计入该合计。",
  },
  ex_09_p3: {
    vi: "Sàng lọc Scope 3 dưới đây chỉ là minh họa. Ước tính vật liệu 9.000 tCO2e và vận tải đầu vào 400 tCO2e dùng giả định riêng cho đào tạo, chưa có phương pháp, hệ số hoặc dữ liệu nhà cung cấp đủ để làm kiểm kê thực. Tổng phần đã ước tính là 9.400 tCO2e, KHÔNG phải tổng Scope 3; không cộng nó thành “tổng phát thải toàn doanh nghiệp”.",
    en: "The Scope 3 screening below is illustrative only. The 9,000 tCO2e materials estimate and 400 tCO2e inbound-transport estimate use separate training assumptions, without sufficient methodology, factors or supplier data for a real inventory. The estimated portion totals 9,400 tCO2e, which is NOT total Scope 3; do not present it as “total corporate emissions”.",
    zh: "以下范围三筛查仅为示例。材料9,000 tCO₂e与进货运输400 tCO₂e的估算采用专门的培训假设，尚无足够的方法、系数或供应商数据支撑真实核算。已估算部分合计9,400 tCO₂e，并非范围三总量；不得将其表述为“企业排放总量”。",
  },
  ex_09_s3th: { vi: "Nhóm Scope 3|Trạng thái mẫu|Giới hạn / việc cần làm", en: "Scope 3 category|Sample status|Limits / actions needed", zh: "范围三类别|示例状态|局限/待办事项" },
  ex_09_p4: {
    vi: "Không mua bù trừ, không trừ avoided emissions trong kịch bản. Tối ưu máy nén được giả định là một hành động, nhưng chưa có đo trước/sau hoặc phương pháp cô lập biến sản lượng; báo cáo không quy toàn bộ mức giảm cho dự án đó.",
    en: "No offsets are purchased and no avoided emissions are deducted in this scenario. Compressor optimization is assumed as one action, but there is no before/after measurement or output-isolation methodology; the report does not attribute the entire reduction to that project.",
    zh: "本情景不购买抵消额度，也不扣除避免排放。空压机优化被假设为一项行动，但无前后测量或产量变量隔离方法；报告不将全部降幅归因于该项目。",
  },

  // ---------- Scope 3 rows (cat|status|limit) ----------
  ex_09_s3_1: { vi: "1. Hàng hóa và dịch vụ mua|Ước tính một phần: 9.000|Chỉ vật liệu; thiếu dịch vụ, cần dữ liệu/sổ hệ số", en: "1. Purchased goods and services|Partially estimated: 9,000|Materials only; services missing, data/factor register needed", zh: "1. 购买的商品与服务|部分估算：9,000|仅材料；缺失服务，需数据/系数清单" },
  ex_09_s3_2: { vi: "2. Hàng hóa vốn|Thiếu|Thu sổ tài sản, kiểm mua máy", en: "2. Capital goods|Missing|Collect asset register, check equipment purchases", zh: "2. 资本货物|缺失|收集资产台账，核查设备采购" },
  ex_09_s3_3: { vi: "3. Nhiên liệu/năng lượng ngoài Scope 1/2|Thiếu|Thu dữ liệu upstream và tổn thất", en: "3. Fuel/energy outside Scope 1/2|Missing|Collect upstream data and losses", zh: "3. 范围一/二之外的燃料与能源|缺失|收集上游数据与损耗" },
  ex_09_s3_4: { vi: "4. Vận tải/phân phối đầu vào|Ước tính một phần: 400|Thiếu một số tuyến và nhà vận tải", en: "4. Upstream transport/distribution|Partially estimated: 400|Some routes and carriers missing", zh: "4. 上游运输/配送|部分估算：400|缺失部分线路与承运商" },
  ex_09_s3_5: { vi: "5. Chất thải vận hành|Thiếu|Cần phương pháp xử lý, hệ số", en: "5. Operational waste|Missing|Treatment methodology and factors needed", zh: "5. 运营废弃物|缺失|需处置方法与系数" },
  ex_09_s3_6: { vi: "6. Công tác|Thiếu|Thu quãng đường, phương tiện", en: "6. Business travel|Missing|Collect distances and modes", zh: "6. 商务差旅|缺失|收集里程与交通方式" },
  ex_09_s3_7: { vi: "7. Đi lại của nhân viên|Thiếu|Khảo sát ẩn danh phương tiện/tần suất", en: "7. Employee commuting|Missing|Anonymous survey of modes/frequency", zh: "7. 员工通勤|缺失|匿名调查交通方式/频率" },
  ex_09_s3_8: { vi: "8. Tài sản thuê đầu nguồn|Chưa xác định|Kiểm hợp đồng, tránh trùng Scope 1/2", en: "8. Upstream leased assets|Undetermined|Check contracts, avoid Scope 1/2 double counting", zh: "8. 上游租赁资产|未确定|核查合同，避免与范围一/二重复" },
  ex_09_s3_9: { vi: "9. Vận tải/phân phối đầu ra|Thiếu|Xác lập bên trả phí và ranh giới", en: "9. Downstream transport/distribution|Missing|Establish paying party and boundary", zh: "9. 下游运输/配送|缺失|明确付费方与边界" },
  ex_09_s3_10: { vi: "10. Gia công sản phẩm bán|Chưa xác định|Kiểm sản phẩm bán và công đoạn sau", en: "10. Processing of sold products|Undetermined|Check sold products and downstream steps", zh: "10. 售出产品的加工|未确定|核查售出产品与后续工序" },
  ex_09_s3_11: { vi: "11. Sử dụng sản phẩm bán|Chưa xác định|Xác định kịch bản/phạm vi sử dụng", en: "11. Use of sold products|Undetermined|Define use scenarios/scope", zh: "11. 售出产品的使用|未确定|明确使用情景/范围" },
  ex_09_s3_12: { vi: "12. Xử lý cuối vòng đời|Thiếu|Vật liệu và kịch bản xử lý theo thị trường", en: "12. End-of-life treatment|Missing|Materials and market treatment scenarios", zh: "12. 废弃阶段处理|缺失|材料与市场处置情景" },
  ex_09_s3_13: { vi: "13. Tài sản thuê cuối nguồn|Chưa xác định|Kiểm danh sách hợp đồng", en: "13. Downstream leased assets|Undetermined|Check contract list", zh: "13. 下游租赁资产|未确定|核查合同清单" },
  ex_09_s3_14: { vi: "14. Nhượng quyền|Không áp dụng trong kịch bản|Giả định không có hợp đồng nhượng quyền", en: "14. Franchises|Not applicable in scenario|Assumes no franchise agreements", zh: "14. 特许经营|本情景不适用|假设无特许经营合同" },
  ex_09_s3_15: { vi: "15. Đầu tư|Chưa xác định|Rà soát khoản đầu tư và ranh giới", en: "15. Investments|Undetermined|Review investments and boundaries", zh: "15. 投资|未确定|核查投资项目与边界" },

  // ---------- 10 ----------
  ex_10_h: { vi: "10. Môi trường — nước, chất thải, hóa chất và thiên nhiên", en: "10. Environment — water, waste, chemicals and nature", zh: "10. 环境——水、废弃物、化学品与自然" },
  ex_10_p1: {
    vi: "Nước lấy từ mạng cấp nước giả định là {w} m³; nước xả sau xử lý {d} m³. Nước tiêu thụ ước tính {c} m³ theo nước lấy trừ nước xả, với giả định không có thay đổi lưu trữ/chuyển giao khác. Không có nguồn nước ngầm/mặt trong kịch bản. Phân loại khu vực căng thẳng nước và thông tin nơi nhận chưa được xác minh; không kết luận nhà máy nằm ngoài vùng rủi ro.",
    en: "Water withdrawal from the hypothetical supply network was {w} m³; treated discharge {d} m³. Water consumption is estimated at {c} m³ (withdrawal minus discharge), assuming no other storage/transfer changes. There are no groundwater/surface sources in this scenario. Water-stress classification and receiving-water information are unverified; do not conclude the plant lies outside risk areas.",
    zh: "假设供水管网取水{w} m³；处理后排水{d} m³。耗水量估算为{c} m³（取水减排水），假设无其他储水/转输变化。本情景无地下水/地表水水源。水压力分区与纳污水体信息未经核实；不得断定工厂位于风险区之外。",
  },
  ex_10_p2: {
    vi: "Cường độ nước lấy là {i} lít/đôi, so với 50 lít/đôi năm 2024. Không có kết quả quan trắc thật, vì vậy không tuyên bố nước thải đạt quy chuẩn. Báo cáo thực phải đính kèm kỳ quan trắc, thông số, nơi lấy mẫu, đơn vị và căn cứ so sánh.",
    en: "Water withdrawal intensity was {i} litres/pair versus 50 litres/pair in 2024. There are no real monitoring results, so no claim is made that wastewater meets standards. A real report must attach the monitoring period, parameters, sampling points, units and comparison basis.",
    zh: "取水强度为{i}升/双，2024年为50升/双。无真实监测结果，故不宣称废水达标。真实报告须附监测周期、指标、采样点、单位与比对依据。",
  },
  ex_10_th: { vi: "Chất thải (tấn)|2024|2025|Phân loại/kết quả giả định", en: "Waste (tonnes)|2024|2025|Classification / illustrative outcome", zh: "废弃物（吨）|2024年|2025年|分类/示例结果" },
  ex_10_r1: { vi: "Không nguy hại — chuyển tái chế|260|300|Có chứng từ hoàn tất theo giả định", en: "Non-hazardous — diverted to recycling|260|300|Completion documents assumed", zh: "一般废弃物——转回收利用|260|300|假设有完成凭证" },
  ex_10_r2: { vi: "Không nguy hại — xử lý khác|80|60|Không coi là tái chế", en: "Non-hazardous — other treatment|80|60|Not counted as recycling", zh: "一般废弃物——其他处置|80|60|不计为回收利用" },
  ex_10_r3: { vi: "Nguy hại — xử lý|40|40|Chuyển đơn vị có chức năng theo giả định", en: "Hazardous — treated|40|40|Transferred to licensed operator (assumed)", zh: "有害废弃物——处置|40|40|假设交由有资质单位" },
  ex_10_r4: { vi: "Tổng phát sinh|{a}|{b}|Tồn đầu = tồn cuối = 0 trong kịch bản", en: "Total generated|{a}|{b}|Opening stock = closing stock = 0 in scenario", zh: "产生总量|{a}|{b}|情景中期末期初库存均为0" },
  ex_10_p3: {
    vi: "300 + 60 + 40 = 400 tấn. Tỷ lệ chuyển tái chế trên TOÀN BỘ chất thải là 75%; nếu chỉ tính 360 tấn không nguy hại thì tỷ lệ là 83,33%, phải ghi đúng mẫu số. Tổng chất thải tăng {chg}, trong khi cường độ giảm từ {i24} xuống {i25} kg/đôi. Hai kết quả được công bố song song.",
    en: "300 + 60 + 40 = 400 tonnes. The recycling diversion rate over ALL waste is 75%; over the 360 tonnes of non-hazardous waste alone it is 83.33% — the denominator must be stated correctly. Total waste rose {chg}, while intensity fell from {i24} to {i25} kg/pair. Both results are disclosed together.",
    zh: "300+60+40=400吨。按全部废弃物计算的回收利用率为75%；若仅按360吨一般废弃物计算则为83.33%，须如实注明分母。废弃物总量增长{chg}，而强度由{i24}降至{i25} kg/双。两项结果并列披露。",
  },
  ex_10_p4: {
    vi: "Danh mục hóa chất giả định có 120 loại, 108 loại có SDS còn phù hợp và 12 loại chờ rà soát. Tỷ lệ hoàn chỉnh hồ sơ là 90%; không chứng minh tất cả hóa chất đáp ứng MRSL/RSL hoặc an toàn sản phẩm. Chưa có số liệu VOC, kiểm nghiệm dư lượng và sự cố tràn đổ được xác minh. Mục chất thải không phải cân bằng khối lượng toàn bộ nguyên liệu/sản phẩm vì còn thiếu tồn kho và khối lượng sản phẩm.",
    en: "The hypothetical chemical inventory lists 120 substances, 108 with valid SDS and 12 pending review. File completeness is 90%; this does not prove all chemicals meet MRSL/RSL or product safety. No verified VOC data, residue testing or spill records exist. The waste section is not a full material/product mass balance, as inventory and product-mass data are missing.",
    zh: "假设化学品清单有120种，108种SDS有效，12种待复核。档案完整率90%；不能证明所有化学品符合MRSL/RSL或产品安全。无经核实的VOC数据、残留检测与泄漏事件记录。废弃物章节非完整的物料/产品质量平衡，因缺失库存与产品质量数据。",
  },
  ex_10_p5: {
    vi: "Chưa có khảo sát đa dạng sinh học hoặc bản đồ khu vực nhạy cảm. Đưa vào kế hoạch sàng lọc tác động; không ghi “không áp dụng” chỉ từ giả định nhà máy ở khu công nghiệp.",
    en: "There is no biodiversity survey or sensitive-area mapping yet. Include impact screening in the plan; do not mark “not applicable” merely because the plant is assumed to be in an industrial zone.",
    zh: "尚无生物多样性调查或敏感区地图。应将影响筛查纳入计划；不得仅因假设工厂位于工业区就标注“不适用”。",
  },

  // ---------- 11 ----------
  ex_11_h: { vi: "11. Xã hội — nhân viên và phát triển", en: "11. Social — employees and development", zh: "11. 社会——员工与发展" },
  ex_11_th: { vi: "Nhân sự|2024|2025|Phạm vi / phương pháp", en: "Workforce|2024|2025|Scope / methodology", zh: "人员|2024年|2025年|范围/方法" },
  ex_11_r1: { vi: "Nhân viên cuối kỳ|1100|1200|Headcount tại 31/12, không cộng theo tháng", en: "Year-end headcount|1100|1200|Headcount at 31/12, not summed monthly", zh: "期末员工数|1100|1200|12月31日人数，非按月加总" },
  ex_11_r2: { vi: "Nữ|715|780|65% nhân viên cuối kỳ", en: "Female|715|780|65% of year-end headcount", zh: "女性|715|780|占期末员工65%" },
  ex_11_r3: { vi: "Nam|385|420|35% nhân viên cuối kỳ", en: "Male|385|420|35% of year-end headcount", zh: "男性|385|420|占期末员工35%" },
  ex_11_r4: { vi: "Hợp đồng không xác định thời hạn|880|960|Phân loại giả định", en: "Open-ended contracts|880|960|Illustrative classification", zh: "无固定期限合同|880|960|示例分类" },
  ex_11_r5: { vi: "Hợp đồng xác định thời hạn|220|240|Cộng với nhóm trên khớp tổng", en: "Fixed-term contracts|220|240|Sums with the above to the total", zh: "固定期限合同|220|240|与上项合计相符" },
  ex_11_r6: { vi: "Lao động nhà thầu cuối kỳ|30|40|Không nằm trong tổng nhân viên", en: "Year-end contractor workers|30|40|Excluded from employee total", zh: "期末承包商人员|30|40|不计入员工总数" },
  ex_11_r7: { vi: "Giờ đào tạo|{a}|{b}|Tổng người tham gia × giờ; cùng phạm vi nhân viên", en: "Training hours|{a}|{b}|Participants × hours; same employee scope", zh: "培训时长|{a}|{b}|参训人数×课时；同员工范围" },
  ex_11_r8: { vi: "Giờ đào tạo / người cuối kỳ|20|24|Không thay thế mẫu số bình quân nếu chọn phương pháp khác", en: "Training hours / year-end headcount|20|24|Do not substitute an average denominator under another method", zh: "人均培训时长（期末）|20|24|若采用其他方法勿替换平均分母" },
  ex_11_p1: {
    vi: "Trong 2025, nữ được 18.720 giờ và nam 10.080 giờ đào tạo: tổng 28.800 giờ; mỗi nhóm 24 giờ/người cuối kỳ. Chưa phân tích theo nhóm nghề, hiệu quả đào tạo hoặc tỷ lệ đánh giá phát triển nghề nghiệp. Tuyển 220 người, nghỉ 120 người: 1.100 + 220 − 120 = 1.200, giả định không có chuyển cơ sở. Dùng nhân viên bình quân 1.150 làm mẫu số nội bộ, tỷ lệ nghỉ là 10,43%; chưa phân tách tuổi/vùng/giới nên không coi đáp ứng đầy đủ disclosure về nghỉ việc.",
    en: "In 2025, women received 18,720 training hours and men 10,080: 28,800 hours total; 24 hours per year-end headcount in each group. No analysis yet by job family, training effectiveness or career-development review rates. Hires 220, leavers 120: 1,100 + 220 − 120 = 1,200, assuming no site transfers. Using average headcount 1,150 as the internal denominator, turnover is 10.43%; without age/region/gender breakdown this does not fully meet turnover disclosure.",
    zh: "2025年女性培训18,720小时，男性10,080小时：合计28,800小时；两组均为24小时/期末人数。尚未按工种、培训效果或职业发展评估比例分析。入职220人，离职120人：1,100+220−120=1,200，假设无跨厂区调动。以平均员工1,150人为内部分母，离职率为10.43%；未按年龄/地区/性别拆分，不能视为充分满足离职披露。",
  },
  ex_11_p2: {
    vi: "Giả định toàn bộ 1.200 nhân viên nằm trong phạm vi thỏa ước lao động tập thể; báo cáo thực cần văn bản hiệu lực và kiểm phạm vi. Chưa có đánh giá lương đủ sống, chênh lệch lương theo giới, nghỉ thai sản/quay lại làm việc, làm thêm giờ hoặc sàng lọc đầy đủ lao động trẻ em/cưỡng bức. Việc thiếu các dữ liệu này được ghi vào kế hoạch, không thay bằng cam kết chung hoặc số 0.",
    en: "It is assumed all 1,200 employees fall under the collective labour agreement; a real report needs the effective text and scope verification. There is no living-wage assessment, gender pay-gap analysis, parental-leave/return data, overtime data or full child/forced-labour screening yet. These data gaps are logged in the plan, not replaced by general commitments or zeros.",
    zh: "假设全部1,200名员工适用集体劳动合同；真实报告需附有效文本并核实范围。尚无体面工资评估、性别薪酬差距、产假/返岗、加班数据或充分的童工/强迫劳动筛查。这些数据缺口记入计划，不以笼统承诺或零替代。",
  },

  // ---------- 12 ----------
  ex_12_h: { vi: "12. Xã hội — sức khỏe và an toàn", en: "12. Social — health and safety", zh: "12. 社会——健康与安全" },
  ex_12_p1: {
    vi: "Kịch bản có 3 chấn thương ghi nhận của nhân viên trên 2.400.000 giờ làm; tỷ suất là 3 × 1.000.000 / 2.400.000 = 1,25 ca/triệu giờ. Năm 2024 có 5 ca/2.200.000 giờ = 2,27 ca/triệu giờ. Chuẩn hóa dùng một triệu giờ; không so trực tiếp với chỉ số dùng 200.000 giờ nếu chưa quy đổi.",
    en: "The scenario records 3 employee injuries over 2,400,000 hours worked; the rate is 3 × 1,000,000 / 2,400,000 = 1.25 cases/million hours. In 2024 there were 5 cases/2,200,000 hours = 2.27 cases/million hours. Normalization uses one million hours; do not compare directly with 200,000-hour indicators without conversion.",
    zh: "情景记录员工工伤3例，工时2,400,000小时；工伤率为3×1,000,000/2,400,000=1.25例/百万工时。2024年为5例/2,200,000小时=2.27例/百万工时。标准化采用百万工时；未经换算不得与20万工时指标直接比较。",
  },
  ex_12_p2: {
    vi: "Giả định 0 ca tử vong và 0 chấn thương hậu quả nghiêm trọng trong sổ nhân viên; chưa có thống kê bệnh nghề nghiệp xác minh. Số tai nạn/giờ làm của nhà thầu chưa có, không được gộp với nhân viên hoặc báo bằng 0. Không tuyên bố an toàn cho toàn bộ lao động trong ranh giới nhà máy.",
    en: "The employee log assumes 0 fatalities and 0 serious-consequence injuries; there are no verified occupational-disease statistics. Contractor accident/hours data is unavailable and must not be merged with employee data or reported as zero. No safety claim is made for all workers within the plant boundary.",
    zh: "员工台账假设死亡0例、严重后果工伤0例；尚无经核实的职业病统计。承包商事故/工时数据缺失，不得与员工数据合并或记为零。不对厂界内全部劳动者作安全声明。",
  },
  ex_12_p3: {
    vi: "Ba ca trong kịch bản: hai ca kẹp tay và một ca trượt ngã. EHS giả định điều tra, bổ sung che chắn máy, chỉnh lối đi và hướng dẫn ca; kiểm soát nội bộ kiểm hành động. Không đạt mục tiêu ≤ 2 ca; kiểm hiệu lực sau 90 ngày còn đang theo dõi. Hệ thống quản lý bao phủ nhân viên theo giả định nội bộ, chưa có đánh giá/chứng nhận độc lập hoặc bằng chứng đủ về mức bao phủ nhà thầu.",
    en: "The three scenario cases: two hand entrapments and one slip-and-fall. EHS hypothetically investigated, added machine guarding, corrected walkways and briefed shifts; internal control verified the actions. The ≤ 2-case target was missed; the 90-day effectiveness check is still being tracked. Management-system coverage of employees is an internal assumption, without independent assessment/certification or sufficient evidence of contractor coverage.",
    zh: "情景中的三起案例：两起手部挤压伤、一起滑倒。假设EHS已调查、增设设备防护、整改通道并开展班组交底；内控已核查行动。未达成≤2例目标；90天成效检查仍在跟踪。管理体系覆盖员工为内部假设，无独立评估/认证，也无承包商覆盖的充分证据。",
  },

  // ---------- 13 ----------
  ex_13_h: { vi: "13. Chuỗi cung ứng, sản phẩm và cộng đồng", en: "13. Supply chain, products and community", zh: "13. 供应链、产品与社区" },
  ex_13_p1: {
    vi: "80/100 nhà cung cấp hoạt động được đánh giá E/S, tăng từ 54/90 năm 2024. 10 nhà cung cấp mới đều được sàng lọc ban đầu, nhưng 100% nhóm mới khác với mức bao phủ 80% toàn bộ. Có 12 nhà cung cấp có phát hiện và 12 CAPA tương ứng trong mẫu: 8 đã kiểm hiệu lực/đóng, 4 đang xử lý. Không chấm dứt hợp đồng trong kịch bản; không chứng minh toàn chuỗi không có tác động tiêu cực.",
    en: "80/100 active suppliers were assessed on E/S, up from 54/90 in 2024. All 10 new suppliers were screened initially, but 100% of the new group differs from 80% overall coverage. The sample has 12 suppliers with findings and 12 corresponding CAPAs: 8 verified/closed, 4 in progress. No contracts were terminated in this scenario; this does not prove the whole chain is free of adverse impacts.",
    zh: "100家活跃供应商中80家完成E/S评估，2024年为54/90家。10家新供应商均通过初始筛查，但新供应商100%筛查不同于整体80%覆盖率。示例中有12家供应商发现问题并对应12项CAPA：8项已验证/关闭，4项处理中。本情景未终止任何合同；不能证明全链无负面影响。",
  },
  ex_13_p2: {
    vi: "Mua địa phương được định nghĩa nội bộ là nhà cung cấp có cơ sở giao hàng trong cùng tỉnh giả định. Chi tiêu 120/600 tỷ đồng thuộc nhóm này, tương ứng 20%; chưa kiểm sở hữu hoặc nguồn nguyên liệu upstream. Định nghĩa phải giữ nhất quán khi so sánh.",
    en: "Local procurement is internally defined as suppliers with a delivery base in the same hypothetical province. Spending of VND 120/600 billion falls in this group, i.e. 20%; ownership and upstream material origin are unverified. The definition must stay consistent for comparisons.",
    zh: "本地采购内部定义为交货基地位于同一假设省份的供应商。该类支出为120/6,000亿越南盾，即20%；所有权与上游原料来源未经核实。对比时须保持定义一致。",
  },
  ex_13_p3: {
    vi: "Kịch bản có 6 khiếu nại chất lượng sản phẩm, 5 đã xử lý và 1 chờ xác định nguyên nhân. Chưa có kiểm nghiệm an toàn sản phẩm đầy đủ, phân loại vi phạm nhãn hoặc hồ sơ quyền riêng tư để tuyên bố tuân thủ. Chương trình cộng đồng giả định trị giá 1 tỷ đồng hỗ trợ đào tạo nghề; thiếu đánh giá kết quả dài hạn và tham vấn nhóm dễ bị tổn thương. Đóng góp này không bù trừ tác động nước thải hoặc lao động.",
    en: "The scenario has 6 product-quality complaints, 5 resolved and 1 awaiting root-cause determination. There is no full product-safety testing, labelling-violation classification or privacy file to support a compliance claim. The hypothetical VND 1 billion community programme supports vocational training; long-term outcome evaluation and vulnerable-group consultation are missing. This contribution does not offset wastewater or labour impacts.",
    zh: "情景中有6起产品质量投诉，5起已处理，1起待确定原因。无充分的产品安全检测、标签违规分类或隐私档案支撑合规声明。假设的10亿越南盾社区项目支持职业培训；缺失长期成效评估与弱势群体征询。该捐赠不抵消废水或劳工影响。",
  },

  // ---------- 14 ----------
  ex_14_h: { vi: "14. Giá trị kinh tế và nguồn lực ESG", en: "14. Economic value and ESG resources", zh: "14. 经济价值与ESG资源" },
  ex_14_p1: {
    vi: "Giá trị kinh tế trực tiếp tạo ra giả định là 960 tỷ đồng. Phân phối 905 tỷ gồm chi phí vận hành 650, lương/phúc lợi 180, chi trả bên cung cấp vốn 40, nộp chính phủ 34 và cộng đồng 1. Giá trị giữ lại 55 tỷ đồng: 960 − 905. Đây là mô hình đơn giản, không phải lợi nhuận kế toán hoặc báo cáo tài chính đã kiểm toán; các khoản không được cộng lại vào chi phí vận hành.",
    en: "Direct economic value generated is hypothetically VND 960 billion. Distribution of 905 billion comprises operating costs 650, wages/benefits 180, payments to capital providers 40, government payments 34 and community 1. Retained value is VND 55 billion: 960 − 905. This is a simplified model, not accounting profit or audited financial statements; items must not be double-counted into operating costs.",
    zh: "假设直接创造的经济价值为9,600亿越南盾。分配9,050亿包括运营成本6,500、工资/福利1,800、资本提供方400、上缴政府340、社区10。留存价值550亿越南盾：9,600−9,050。此为简化模型，非会计利润或经审计财报；各项目不得重复计入运营成本。",
  },
  ex_14_p2: {
    vi: "Đối chiếu năm 2024: tạo ra 800, phân phối 756, giữ lại 44 tỷ. Phân phối gồm vận hành 550, nhân viên 145, vốn 32, chính phủ 28 và cộng đồng 1. Nguồn DEMO-FIN phải được thay bằng sổ cái và quy tắc phân loại thực. Chưa có dữ liệu về hỗ trợ chính phủ hoặc chính sách/chiến lược thuế.",
    en: "2024 comparison: generated 800, distributed 756, retained 44 billion. Distribution comprised operations 550, employees 145, capital 32, government 28 and community 1. The DEMO-FIN source must be replaced by the real ledger and classification rules. There is no data yet on government assistance or tax policy/strategy.",
    zh: "2024年对照：创造8,000亿，分配7,560亿，留存440亿。分配包括运营5,500、员工1,450、资本320、政府280、社区10。DEMO-FIN来源须替换为真实总账与分类规则。尚无政府补助或税收政策/战略数据。",
  },
  ex_14_p3: {
    vi: "Nguồn lực ESG 2025 trong tình huống: đầu tư thiết bị 2 tỷ và chi phí đào tạo/đánh giá 0,5 tỷ. Khoản đầu tư vốn và chi phí vận hành khác nhau, không cộng lại vào bảng phân phối nếu đã nằm trong các khoản tương ứng. Chưa tính thời gian hoàn vốn hoặc tiết kiệm tiền xác minh.",
    en: "2025 ESG resources in this scenario: equipment investment of VND 2 billion and training/assessment costs of 0.5 billion. Capital investment and operating expenses are different; do not double-count into the distribution table where already included. Payback period and verified monetary savings are not yet calculated.",
    zh: "本情景2025年ESG资源：设备投资20亿越南盾，培训/评估费用5亿。资本性投资与运营费用不同，已计入相应项目的不得在分配表中重复加总。尚未计算投资回收期或经核实的货币节约。",
  },

  // ---------- 15 ----------
  ex_15_h: { vi: "15. Chất lượng, khoảng trống và soát xét", en: "15. Quality, gaps and review", zh: "15. 质量、缺口与复核" },
  ex_15_p1: {
    vi: "Bộ tháng minh họa bao phủ 12/12 tháng cho sản lượng, điện, nhiên liệu và nước; chỉ áp dụng CS01. Nhân sự và chất thải dùng tổng hợp giả định có đối chiếu phép tính. Không công bố tỷ lệ “100% dữ liệu được kiểm chứng” vì toàn bộ nguồn và phê duyệt là hư cấu. Số liệu tham chiếu được kiểm tra tính nhất quán toán học, không được kiểm chứng thực địa.",
    en: "The illustrative monthly set covers 12/12 months for output, electricity, fuel and water; CS01 only. Headcount and waste use hypothetical aggregates with calculation cross-checks. Do not claim “100% of data verified” since all sources and approvals are fictional. Reference figures are checked for mathematical consistency, not field-verified.",
    zh: "示例月度数据集覆盖产量、电力、燃料与水的12/12个月；仅适用于CS01。人员与废弃物采用假设汇总并核对算式。不得宣称“100%数据经核实”，因全部来源与审批均为虚构。参考数据仅核查数学一致性，未经实地核实。",
  },
  ex_15_th: { vi: "Khoảng trống|Ảnh hưởng|Phụ trách|Hạn kế hoạch giả định", en: "Gap|Impact|Owner|Hypothetical plan deadline", zh: "缺口|影响|负责人|假设计划期限" },
  ex_15_r1: { vi: "Hệ số/GWP/địa lý thật|Không dùng KNK mẫu làm kiểm kê thực|EHS|31/03/2026", en: "Real factors/GWP/geography|Sample GHG cannot serve as a real inventory|EHS|31/03/2026", zh: "真实系数/GWP/地域|示例温室气体不能作为真实核算|EHS|31/03/2026" },
  ex_15_r2: { vi: "Scope 2 thị trường|Không có tổng theo thị trường|Mua hàng / EHS|30/06/2026", en: "Market-based Scope 2|No market-based total|Procurement / EHS|30/06/2026", zh: "市场法范围二|无市场法总量|采购/EHS|30/06/2026" },
  ex_15_r3: { vi: "Scope 3 chưa đầy đủ|Không có tổng chuỗi giá trị|Mua hàng / logistics|30/09/2026", en: "Incomplete Scope 3|No value-chain total|Procurement / logistics|30/09/2026", zh: "范围三不完整|无价值链总量|采购/物流|30/09/2026" },
  ex_15_r4: { vi: "Nhà thầu và bệnh nghề nghiệp|Chưa đủ chỉ số an toàn toàn bộ lao động|EHS / nhân sự|30/06/2026", en: "Contractors and occupational disease|Insufficient safety indicators for all workers|EHS / HR|30/06/2026", zh: "承包商与职业病|全员安全指标不足|EHS/人事|30/06/2026" },
  ex_15_r5: { vi: "Quản trị/thù lao và quyền lao động|Chỉ mục GRI còn nhiều mục thiếu|Pháp chế / nhân sự|30/09/2026", en: "Governance/remuneration and labour rights|GRI index still has many gaps|Legal / HR|30/09/2026", zh: "治理/薪酬与劳工权利|GRI索引仍多缺口|法务/人事|30/09/2026" },
  ex_15_r6: { vi: "Stress nước, đa dạng sinh học, quan trắc|Chưa kết luận rủi ro/tuân thủ|EHS|30/06/2026", en: "Water stress, biodiversity, monitoring|No risk/compliance conclusion yet|EHS|30/06/2026", zh: "水压力、生物多样性、监测|尚无风险/合规结论|EHS|30/06/2026" },
  ex_15_p2: {
    vi: "Các hạn 2026 ở đây là mốc kế hoạch của tình huống lập báo cáo sau năm 2025, không phải hành động đã hoàn thành hoặc nghĩa vụ pháp định. Nếu dùng mẫu sau các mốc này, phải đánh giá tình trạng và cập nhật ngày, không giữ nguyên như cam kết hiện tại.",
    en: "The 2026 deadlines here are planning milestones for a scenario of reporting after 2025, not completed actions or statutory obligations. If this sample is used after these dates, reassess the status and update the dates; do not keep them as current commitments.",
    zh: "此处的2026年期限为2025年之后报告情景的计划节点，非已完成行动或法定义务。若在此日期后使用本示例，须重新评估状态并更新日期，不得保留为现行承诺。",
  },
  ex_15_p3: {
    vi: "Không có assurance độc lập. Quy trình áp dụng thực tế: chủ dữ liệu nộp nguồn → người khác soát xét → duyệt và khóa kỳ → lập báo cáo → kiểm tra nội dung/khung → lãnh đạo duyệt và phát hành. ESG Hub chốt dữ liệu khi duyệt; nội dung đầy đủ từ khung này cần được biên soạn thêm, không tự sinh đầy đủ từ một bảng KPI.",
    en: "There is no independent assurance. The real-application process: data owner submits sources → another person reviews → period approval and lock → report preparation → content/framework check → leadership approval and release. ESG Hub finalizes data upon approval; full content from this framework needs further drafting and is not auto-generated from a single KPI table.",
    zh: "无独立鉴证。实际应用流程：数据负责人提交来源→他人复核→审批并锁定期→编制报告→内容/框架检查→管理层批准发布。ESG Hub在审批时锁定数据；本框架的完整内容需进一步编写，不能由一张KPI表自动生成。",
  },
  ex_15_p4: {
    vi: "Khi sửa sau phát hành: giữ bản cũ, lập CAPA/lý do, mở kỳ, sửa có phiên bản, soát xét lại, phát hành báo cáo thay thế và giải thích ảnh hưởng. Không ghi đè kết quả bản đã duyệt bằng số liệu hiện tại.",
    en: "For post-release corrections: keep the old version, raise a CAPA/reason, reopen the period, revise with versioning, re-review, issue a replacement report and explain the impact. Do not overwrite the approved version's results with current figures.",
    zh: "发布后更正：保留旧版、提出CAPA/理由、重开报告期、版本化修订、重新复核、发布替代报告并说明影响。不得用现行数据覆盖已批准版本的结论。",
  },

  // ---------- 16 ----------
  ex_16_h: { vi: "16. Kế hoạch 2026 và Kaizen", en: "16. 2026 plan and Kaizen", zh: "16. 2026年计划与改善" },
  ex_16_th: { vi: "Ưu tiên|Mục tiêu / nghiệm thu|Hành động / nguồn lực giả định|Chủ trì / hạn", en: "Priority|Target / acceptance|Hypothetical actions / resources|Owner / deadline", zh: "优先事项|目标/验收标准|假设行动/资源|牵头/期限" },
  ex_16_r1: { vi: "Điện|≤ 2,4 kWh/đôi với cùng phạm vi|Đo nhánh và điều khiển máy nén; 1,2 tỷ đầu tư|Cơ điện / 31/12/2026", en: "Electricity|≤ 2.4 kWh/pair, same scope|Sub-metering and compressor control; VND 1.2bn investment|Utilities / 31/12/2026", zh: "电力|≤2.4 kWh/双，同范围|分项计量与空压机控制；投资12亿越南盾|动力/31/12/2026" },
  ex_16_r2: { vi: "Nước|≤ 35 lít/đôi; xác lập stress nước|Phát hiện rò rỉ/đồng hồ; 0,3 tỷ đầu tư|EHS / 31/12/2026", en: "Water|≤ 35 litres/pair; establish water stress|Leak detection/meters; VND 0.3bn investment|EHS / 31/12/2026", zh: "水|≤35升/双；明确水压力|检漏/水表；投资3亿越南盾|EHS/31/12/2026" },
  ex_16_r3: { vi: "An toàn|≤ 2 ca; kiểm che chắn và hiệu lực 90 ngày|Nguyên nhân gốc 3 ca, kiểm tra độc lập; 0,2 tỷ chi phí|EHS / 30/06/2026", en: "Safety|≤ 2 cases; guarding and 90-day effectiveness check|Root causes of 3 cases, independent inspection; VND 0.2bn cost|EHS / 30/06/2026", zh: "安全|≤2例；防护与90天成效检查|3起案例根本原因、独立检查；费用2亿越南盾|EHS/30/06/2026" },
  ex_16_r4: { vi: "Nhà cung cấp|Đánh giá 100/100, xử lý 4 CAPA mở|Ưu tiên rủi ro, bằng chứng đóng; 0,2 tỷ chi phí|Mua hàng / 30/09/2026", en: "Suppliers|Assess 100/100, close 4 open CAPAs|Risk prioritization, closure evidence; VND 0.2bn cost|Procurement / 30/09/2026", zh: "供应商|评估100/100家，关闭4项未结CAPA|风险优先、关闭证据；费用2亿越南盾|采购/30/09/2026" },
  ex_16_r5: { vi: "Dữ liệu và báo cáo|Hệ số thật; kế hoạch 15 nhóm Scope 3; chỉ mục có trạng thái|Chủ dữ liệu, rà soát khung; 0,1 tỷ chi phí|Ban ESG / 30/09/2026", en: "Data and reporting|Real factors; 15-category Scope 3 plan; status-tagged index|Data owners, framework review; VND 0.1bn cost|ESG Committee / 30/09/2026", zh: "数据与报告|真实系数；范围三15类别计划；带状态索引|数据负责人、框架复核；费用1亿越南盾|ESG委员会/30/09/2026" },
  ex_16_p1: {
    vi: "Tổng ngân sách dự kiến 2 tỷ đồng, gồm 1,5 tỷ đầu tư và 0,5 tỷ chi phí, là kế hoạch giả định chưa được phê duyệt thật. Mỗi CAPA cần người kiểm hiệu lực khác người thực hiện, kết quả và nguồn. Chọn “đóng” trên web chỉ là ghi trạng thái; bằng chứng kiểm hiệu lực phải đính kèm để tổ chức nghiệm thu.",
    en: "The planned total budget is VND 2 billion — 1.5 billion investment and 0.5 billion expenses — a hypothetical plan not yet really approved. Each CAPA needs an effectiveness verifier different from the implementer, plus results and sources. Clicking “close” on the web only records a status; effectiveness evidence must be attached for organizational acceptance.",
    zh: "预计总预算20亿越南盾，其中投资15亿、费用5亿，为未经真实批准的假设计划。每项CAPA的成效核查人须与执行人不同，并附结果与来源。在网页点击“关闭”仅记录状态；须附成效证据供组织验收。",
  },

  // ---------- 17 ----------
  ex_17_h: { vi: "17. Phụ lục A — bảng KPI đối chiếu", en: "17. Appendix A — KPI reconciliation table", zh: "17. 附录A——KPI核对表" },
  ex_17_p1: {
    vi: "Các mã KPI dưới đây là mã của báo cáo minh họa, không tự động trùng bộ 24 KPI mặc định của ứng dụng. Phải tạo hoặc ánh xạ từ điển trước khi nhập dữ liệu thực.",
    en: "The KPI codes below belong to this illustrative report and do not automatically match the app's default 24-KPI set. Create or map the dictionary before entering real data.",
    zh: "以下KPI编码属于本示例报告，不自动对应应用默认的24个KPI。录入真实数据前须创建或映射字典。",
  },
  ex_17_th: { vi: "Mã|Chỉ tiêu|Đơn vị|2024|2025|Cách tổng hợp|Bằng chứng giả định", en: "Code|Indicator|Unit|2024|2025|Aggregation|Illustrative evidence", zh: "编码|指标|单位|2024年|2025年|汇总方法|示例证据" },
  ex_17_p2: {
    vi: "Scope 2 thị trường: thiếu; Scope 3: mới ước tính một phần; không có giá trị 0 đại diện cho hai mục này. Chưa có mục tiêu hoặc tình trạng được đảm bảo độc lập cho mọi KPI.",
    en: "Market-based Scope 2: missing; Scope 3: only partially estimated; there is no zero representing these two items. No KPI has an independently assured target or status.",
    zh: "市场法范围二：缺失；范围三：仅部分估算；这两项没有可代表的零值。所有KPI均无经独立鉴证的目标或状态。",
  },

  // ---------- 18 ----------
  ex_18_h: { vi: "18. Phụ lục B — dữ liệu tháng và sổ bằng chứng", en: "18. Appendix B — monthly data and evidence log", zh: "18. 附录B——月度数据与证据台账" },
  ex_18_th: { vi: "Kỳ|Sản lượng đôi|Điện kWh|Diesel lít|LPG kg|Nước lấy m³|Nước thải m³", en: "Period|Output pairs|Electricity kWh|Diesel litres|LPG kg|Water withdrawal m³|Wastewater m³", zh: "期间|产量（双）|电kWh|柴油升|液化石油气kg|取水m³|排水m³" },
  ex_18_p1: {
    vi: "Tổng năm: {pairs} đôi; {kwh} kWh; {d} lít diesel; {l} kg LPG; {w} m³ nước lấy; {dw} m³ nước thải. Bảng này cho phép kiểm tổng và cường độ, không phải hồ sơ đo lường thật.",
    en: "Annual totals: {pairs} pairs; {kwh} kWh; {d} litres diesel; {l} kg LPG; {w} m³ water withdrawal; {dw} m³ wastewater. This table allows total and intensity checks; it is not a real measurement record.",
    zh: "全年合计：{pairs}双；{kwh} kWh；柴油{d}升；液化石油气{l} kg；取水{w} m³；排水{dw} m³。本表用于核对总量与强度，非真实计量记录。",
  },
  ex_18_eth: { vi: "Mã giả định|Tài liệu cần có|Chủ dữ liệu|Điểm kiểm tra", en: "Illustrative code|Required documents|Data owner|Checkpoints", zh: "示例编码|应备文件|数据负责人|核查点" },
  ex_18_p2: {
    vi: "Ví dụ chuyển dữ liệu thật lên web: đặt mã theo kỳ/cơ sở/KPI/nguồn/phiên bản như 2025-01_CS01_E01_DONGHO01_v01, đăng ký tài liệu nguồn, rồi nhập bản ghi có cùng mã bằng chứng. Không tạo SHA-256, chữ ký hoặc biên bản giả cho mã DEMO.",
    en: "Example of moving real data to the web: code by period/site/KPI/source/version such as 2025-01_CS01_E01_DONGHO01_v01, register the source document, then enter records with the same evidence code. Do not fabricate SHA-256 hashes, signatures or minutes for DEMO codes.",
    zh: "将真实数据上网示例：按期间/厂区/KPI/来源/版本编码，如2025-01_CS01_E01_DONGHO01_v01，登记来源文件，再录入相同证据编码的记录。不得为DEMO编码伪造SHA-256、签字或纪要。",
  },

  // ---------- evidence rows (code|doc|owner|check) ----------
  ex_ev_1: { vi: "DEMO-PROD|Sản lượng thành phẩm 12 tháng|Sản xuất / QA|Đối chiếu nhập kho; loại hàng lỗi, quy tắc đôi giày", en: "DEMO-PROD|12-month finished output|Production / QA|Reconcile warehouse receipts; exclude defects, pair-counting rules", zh: "DEMO-PROD|12个月成品产量|生产/QA|核对入库；剔除次品、双数规则" },
  ex_ev_2: { vi: "DEMO-ELEC|Hóa đơn điện + chỉ số đồng hồ 12 tháng|Cơ điện / tài chính|Đối chiếu mua điện, tránh cộng đồng hồ nhánh hai lần", en: "DEMO-ELEC|Electricity bills + 12-month meter readings|Utilities / finance|Reconcile purchased electricity; avoid double-counting sub-meters", zh: "DEMO-ELEC|电费单+12个月电表读数|动力/财务|核对购电；避免支表重复加总" },
  ex_ev_3: { vi: "DEMO-FUEL|Phiếu nhiên liệu diesel và LPG|Kho / cơ điện|Tồn đầu + mua − tồn cuối; nhiên liệu dùng trong ranh giới", en: "DEMO-FUEL|Diesel and LPG fuel slips|Warehouse / utilities|Opening stock + purchases − closing stock; fuel used within boundary", zh: "DEMO-FUEL|柴油与液化石油气单据|仓储/动力|期初+采购−期末；边界内耗用燃料" },
  ex_ev_4: { vi: "DEMO-FACTOR|Sổ hệ số minh họa|EHS|Hệ số GIẢ ĐỊNH, không dùng cho kiểm kê thực", en: "DEMO-FACTOR|Illustrative factor register|EHS|HYPOTHETICAL factors; not for real inventories", zh: "DEMO-FACTOR|示例系数台账|EHS|假设系数，不用于真实核算" },
  ex_ev_5: { vi: "DEMO-WATER|Đồng hồ nước / nước thải 12 tháng|EHS / cơ điện|Kiểm phạm vi đồng hồ, cân bằng nước", en: "DEMO-WATER|12-month water/wastewater meters|EHS / utilities|Check meter coverage, water balance", zh: "DEMO-WATER|12个月水/废水表|EHS/动力|核查水表范围、水平衡" },
  ex_ev_6: { vi: "DEMO-WASTE|Phiếu cân và chứng từ xử lý|EHS|Phân loại nguy hại, cân bằng phát sinh/xử lý/tồn", en: "DEMO-WASTE|Weighing slips and treatment documents|EHS|Hazardous classification; generation/treatment/stock balance", zh: "DEMO-WASTE|称重单与处置凭证|EHS|有害分类；产生/处置/库存平衡" },
  ex_ev_7: { vi: "DEMO-MAT|Sổ mua vật liệu và xác nhận tái chế|Mua hàng / kho|Khối lượng vật liệu đầu vào, cùng phạm vi", en: "DEMO-MAT|Material purchase log and recycling confirmations|Procurement / warehouse|Input material mass, same scope", zh: "DEMO-MAT|材料采购台账与再生确认|采购/仓储|投入材料质量，同范围" },
  ex_ev_8: { vi: "DEMO-HR|Tổng hợp nhân sự, giờ làm và đào tạo|Nhân sự|Ẩn danh; danh sách cuối kỳ, không cộng headcount tháng", en: "DEMO-HR|Headcount, hours and training summary|HR|Anonymized; year-end roster, no monthly headcount sums", zh: "DEMO-HR|人员、工时与培训汇总|人事|匿名；期末名单，不按月加总人数" },
  ex_ev_9: { vi: "DEMO-OHS|Nhật ký tai nạn và điều tra|EHS / nhân sự|Số sự kiện và giờ làm cùng phạm vi; không bỏ tai nạn nhẹ", en: "DEMO-OHS|Accident log and investigations|EHS / HR|Events and hours in same scope; minor accidents included", zh: "DEMO-OHS|事故台账与调查|EHS/人事|事件数与工时同范围；轻微事故不遗漏" },
  ex_ev_10: { vi: "DEMO-SUP|Sổ nhà cung cấp và CAPA|Mua hàng|Nhà cung cấp hoạt động và hồ sơ được đánh giá", en: "DEMO-SUP|Supplier register and CAPAs|Procurement|Active suppliers and assessed files", zh: "DEMO-SUP|供应商台账与CAPA|采购|活跃供应商与已评估档案" },
  ex_ev_11: { vi: "DEMO-FIN|Tổng hợp phân phối giá trị kinh tế|Tài chính|Đối chiếu sổ cái, tránh cộng lại chi phí", en: "DEMO-FIN|Economic value distribution summary|Finance|Reconcile the ledger; avoid double-counting costs", zh: "DEMO-FIN|经济价值分配汇总|财务|核对总账，避免成本重复" },
  ex_ev_12: { vi: "DEMO-GOV|Biên bản Ban ESG / chính sách|Thư ký / pháp chế|Hồ sơ phê duyệt và công khai giới hạn", en: "DEMO-GOV|ESG Committee minutes / policies|Secretary / legal|Approval records and disclosure limits", zh: "DEMO-GOV|ESG委员会纪要/政策|秘书/法务|审批记录与披露边界" },

  // ---------- 19 ----------
  ex_19_h: { vi: "19. Phụ lục C — chỉ mục nội dung tham khảo", en: "19. Appendix C — reference content index", zh: "19. 附录C——参考内容索引" },
  ex_19_p1: {
    vi: "Bảng là chỉ mục học cách truy xuất, không phải tuyên bố đáp ứng. “Minh họa một phần” nghĩa là có nội dung liên quan nhưng còn thiếu yêu cầu/bằng chứng. Mẫu không sử dụng lý do thiếu này để tự nhận đáp ứng quy định về omissions của GRI.",
    en: "This table is an index for learning traceability, not a compliance claim. “Partially illustrated” means related content exists but requirements/evidence are still missing. The sample does not use these gaps to self-declare compliance with GRI's omissions provisions.",
    zh: "本表为学习可追溯性的索引，非合规声明。“部分示例”指有相关内容但仍缺要求/证据。本示例不以这些缺口自行宣称符合GRI遗漏条款。",
  },
  ex_19_th: { vi: "Mã / nhóm|Vị trí|Trạng thái và giới hạn", en: "Code / group|Location|Status and limits", zh: "编码/组|位置|状态与局限" },
  ex_19_p2: {
    vi: "Khi lập báo cáo thật, tách từng mã thành một dòng có chương/trang, nội dung đáp ứng, bằng chứng, trạng thái và lý do thiếu hợp lệ. Rà soát phiên bản tiêu chuẩn ngành/khí hậu/năng lượng/đa dạng sinh học và thời điểm áp dụng trước khi công bố.",
    en: "For a real report, break each code into a row with chapter/page, responsive content, evidence, status and valid reasons for omissions. Review sector/climate/energy/biodiversity standard versions and effective dates before disclosure.",
    zh: "编制真实报告时，将每个编码拆为一行，含章节/页码、回应内容、证据、状态与合理的遗漏理由。披露前复核行业/气候/能源/生物多样性标准的版本与生效时间。",
  },

  // ---------- 19 rows (code|location|status) ----------
  ex_19_1: { vi: "2-1, 2-2, 2-3|01, 03–04|Minh họa phạm vi; không có pháp nhân/đầu mối thật", en: "2-1, 2-2, 2-3|01, 03–04|Scope illustrated; no real legal entity/contacts", zh: "2-1、2-2、2-3|01、03–04|范围已示例；无法人/联系人实体" },
  ex_19_2: { vi: "2-4, 2-5|04, 15|Nêu không điều chỉnh trong kịch bản và không assurance", en: "2-4, 2-5|04, 15|States no restatement in scenario and no assurance", zh: "2-4、2-5|04、15|说明情景中未重述且无鉴证" },
  ex_19_3: { vi: "2-6, 2-7, 2-8|03, 11|Minh họa một phần; thiếu phân tổ/vùng/nhà thầu đầy đủ", en: "2-6, 2-7, 2-8|03, 11|Partially illustrated; full breakdowns/regions/contractors missing", zh: "2-6、2-7、2-8|03、11|部分示例；缺完整分组/区域/承包商" },
  ex_19_4: { vi: "2-9 đến 2-14|07|Minh họa trách nhiệm; thiếu thành phần, đề cử, độc lập, bằng chứng duyệt", en: "2-9 to 2-14|07|Responsibilities illustrated; composition, nomination, independence, approval evidence missing", zh: "2-9至2-14|07|职责已示例；缺构成、提名、独立性、审批证据" },
  ex_19_5: { vi: "2-15 đến 2-21|07, 15|Thiếu công bố xung đột, năng lực, đánh giá, thù lao và tỷ lệ", en: "2-15 to 2-21|07, 15|Conflict, competency, evaluation, remuneration and ratio disclosures missing", zh: "2-15至2-21|07、15|缺失冲突、能力、评估、薪酬与比例披露" },
  ex_19_6: { vi: "2-22 đến 2-26|02, 05, 07–08|Minh họa chiến lược/chính sách/kênh; thiếu triển khai và bằng chứng", en: "2-22 to 2-26|02, 05, 07–08|Strategy/policies/channels illustrated; implementation and evidence missing", zh: "2-22至2-26|02、05、07–08|战略/政策/渠道已示例；缺执行与证据" },
  ex_19_7: { vi: "2-27, 2-28|08|Chưa có tra soát pháp luật hoặc thành viên hiệp hội thật", en: "2-27, 2-28|08|No legal review or real association membership yet", zh: "2-27、2-28|08|尚无法律排查或真实协会会员" },
  ex_19_8: { vi: "2-29, 2-30|05, 11|Tham vấn và thỏa ước giả định; chưa chứng minh đầy đủ", en: "2-29, 2-30|05, 11|Hypothetical engagement and agreements; not fully evidenced", zh: "2-29、2-30|05、11|假设性参与和协议；证据不充分" },
  ex_19_9: { vi: "3-1, 3-2, 3-3|06, 08–16|Minh họa quy trình/danh sách/quản lý; chưa có hồ sơ phê duyệt thật", en: "3-1, 3-2, 3-3|06, 08–16|Process/list/management illustrated; no real approval records", zh: "3-1、3-2、3-3|06、08–16|流程/清单/管理已示例；无真实审批记录" },
  ex_19_10: { vi: "301-1, 301-2|03, 17|Có khối lượng/tỷ lệ; thiếu phân loại và truy xuất thật", en: "301-1, 301-2|03, 17|Mass/ratios available; real classification and traceability missing", zh: "301-1、301-2|03、17|有质量/比例；缺真实分类与追溯" },
  ex_19_11: { vi: "302-1, 302-3, 305-1, 305-2, 305-3, 305-4|04, 09, 17|Có phép tính; hệ số giả định, Scope 2 thị trường và Scope 3 thiếu", en: "302-1, 302-3, 305-1, 305-2, 305-3, 305-4|04, 09, 17|Calculations available; hypothetical factors, market-based Scope 2 and Scope 3 missing", zh: "302-1、302-3、305-1、305-2、305-3、305-4|04、09、17|有算式；假设系数、市场法范围二与范围三缺失" },
  ex_19_12: { vi: "303-3, 303-4, 303-5|10|Có cân bằng; thiếu stress nước, nơi nhận và chất lượng", en: "303-3, 303-4, 303-5|10|Balance available; water stress, receiving waters and quality missing", zh: "303-3、303-4、303-5|10|有水平衡；缺水压力、纳污水体与水质" },
  ex_19_13: { vi: "306-3, 306-4, 306-5|10|Có phân loại sơ bộ; thiếu chi tiết phương pháp/on-site/off-site và nguồn", en: "306-3, 306-4, 306-5|10|Preliminary classification; method/on-site/off-site details and sources missing", zh: "306-3、306-4、306-5|10|有初步分类；缺方法/场内/场外细节与来源" },
  ex_19_14: { vi: "401-1, 404-1, 405-1|11|Minh họa tổng; chưa đủ phân tổ, tuổi, nhóm nghề, quản trị", en: "401-1, 404-1, 405-1|11|Totals illustrated; insufficient breakdowns, age, job families, governance", zh: "401-1、404-1、405-1|11|总量已示例；分组、年龄、工种、治理拆分不足" },
  ex_19_15: { vi: "403-1 đến 403-10|12|Một số chỉ số nhân viên; thiếu quản lý chi tiết/nhà thầu/bệnh nghề nghiệp", en: "403-1 to 403-10|12|Some employee indicators; detailed management/contractors/occupational disease missing", zh: "403-1至403-10|12|有部分员工指标；缺详细管理/承包商/职业病" },
  ex_19_16: { vi: "308-1, 308-2, 414-1, 414-2|13|Minh họa đánh giá nhà cung cấp; thiếu chi tiết tác động và bằng chứng", en: "308-1, 308-2, 414-1, 414-2|13|Supplier assessment illustrated; impact details and evidence missing", zh: "308-1、308-2、414-1、414-2|13|供应商评估已示例；缺影响细节与证据" },
  ex_19_17: { vi: "201-1, 204-1, 413-1|13–14|Có bảng giả định; thiếu hồ sơ kế toán/cộng đồng thật", en: "201-1, 204-1, 413-1|13–14|Hypothetical tables; real accounting/community records missing", zh: "201-1、204-1、413-1|13–14|有假设表格；缺真实会计/社区记录" },
  ex_19_18: { vi: "Các topic khác trọng yếu|06, 15|Cần chọn và đối chiếu từng disclosure từ tiêu chuẩn hiện hành", en: "Other material topics|06, 15|Select and map each disclosure from current standards", zh: "其他实质性议题|06、15|需按现行标准逐项选择与对应披露" },

  // ---------- 20 ----------
  ex_20_h: { vi: "20. Cách dùng mẫu và nguồn", en: "20. How to use this sample, and sources", zh: "20. 示例使用方法与来源" },
  ex_20_l1: { vi: "Dùng [Khung báo cáo ESG](#report-kit) để xác định nội dung cần thu, giữ cả các phần còn thiếu.", en: "Use the [ESG report framework](#report-kit) to identify content to collect, keeping even the missing parts.", zh: "使用[ESG报告框架](#report-kit)确定需收集的内容，保留缺失部分。" },
  ex_20_l2: { vi: "Xác lập pháp nhân, phạm vi, chủ đề trọng yếu và từ điển KPI thật; không nhập số liệu DEMO vào dữ liệu chung.", en: "Establish the real legal entity, scope, material topics and KPI dictionary; do not import DEMO figures into shared data.", zh: "明确真实法人、范围、实质性议题与KPI字典；不得将DEMO数据导入公共数据。" },
  ex_20_l3: { vi: "Thu bằng chứng, nhập từng kỳ và nguồn, ghi đúng đo/ước tính/thiếu/không áp dụng.", en: "Collect evidence, enter each period and source, recording measured/estimated/missing/not applicable correctly.", zh: "收集证据，按期间与来源录入，正确标注实测/估算/缺失/不适用。" },
  ex_20_l4: { vi: "Soát xét độc lập, khóa kỳ, chốt báo cáo, rồi biên soạn các chương và đối chiếu yêu cầu.", en: "Independent review, period lock, report finalization, then draft chapters and map requirements.", zh: "独立复核、锁定期、定稿报告，再编写章节并对应要求。" },
  ex_20_l5: { vi: "Phê duyệt, công bố phạm vi/giới hạn/assurance và lưu phiên bản; theo CAPA để cải tiến.", en: "Approve, disclose scope/limits/assurance and archive versions; follow CAPAs for improvement.", zh: "批准，披露范围/局限/鉴证并存档版本；通过CAPA持续改进。" },
  ex_20_src: {
    vi: "Nguồn để đối chiếu: [GRI Standards](https://www.globalreporting.org/standards/), [GHG Protocol Corporate Standard](https://ghgprotocol.org/corporate-standard), [Scope 2 Guidance](https://ghgprotocol.org/scope-2-guidance), [Scope 3 Standard](https://ghgprotocol.org/corporate-value-chain-scope-3-standard). Các liên kết là nguồn tham chiếu cần đọc bản hiện hành; không có xác nhận rằng mẫu đã được các tổ chức này thẩm định.",
    en: "Sources for cross-checking: [GRI Standards](https://www.globalreporting.org/standards/), [GHG Protocol Corporate Standard](https://ghgprotocol.org/corporate-standard), [Scope 2 Guidance](https://ghgprotocol.org/scope-2-guidance), [Scope 3 Standard](https://ghgprotocol.org/corporate-value-chain-scope-3-standard). These links are references to be read in their current versions; there is no confirmation that this sample has been reviewed by these organizations.",
    zh: "核对来源：[GRI Standards](https://www.globalreporting.org/standards/)、[GHG Protocol Corporate Standard](https://ghgprotocol.org/corporate-standard)、[Scope 2 Guidance](https://ghgprotocol.org/scope-2-guidance)、[Scope 3 Standard](https://ghgprotocol.org/corporate-value-chain-scope-3-standard)。这些链接为须阅读现行版本的参考文献；本示例未经上述机构审核确认。",
  },

  // ---------- Cách tính cho biểu đồ ----------
  ex_calc_ghg1: {
    vi: "Scope 1 = (diesel_lít × 2,68 + LPG_kg × 3) / 1000 → 2025: ({d} × 2,68 + {l} × 3)/1000 = {v} {u}.",
    en: "Scope 1 = (diesel_litres × 2.68 + LPG_kg × 3) / 1000 → 2025: ({d} × 2.68 + {l} × 3)/1000 = {v} {u}.",
    zh: "范围一 = (柴油升 × 2.68 + 液化石油气kg × 3) / 1000 → 2025年：({d} × 2.68 + {l} × 3)/1000 = {v} {u}。",
  },
  ex_calc_ghg2: {
    vi: "Scope 2 = điện_kWh × 0,5 / 1000 → 2025: {kwh} × 0,5/1000 = {v} {u}.",
    en: "Scope 2 = electricity_kWh × 0.5 / 1000 → 2025: {kwh} × 0.5/1000 = {v} {u}.",
    zh: "范围二 = 电_kWh × 0.5 / 1000 → 2025年：{kwh} × 0.5/1000 = {v} {u}。",
  },
  ex_calc_int1: {
    vi: "kWh/đôi = ΣkWh / Σđôi; kgCO₂e/đôi = (Scope 1 + Scope 2) × 1000 / Σđôi; lít/đôi = Σm³ × 1000 / Σđôi. Chỉ số = giá trị 2025 / giá trị 2024 × 100.",
    en: "kWh/pair = ΣkWh / Σpairs; kgCO₂e/pair = (Scope 1 + Scope 2) × 1000 / Σpairs; litres/pair = Σm³ × 1000 / Σpairs. Index = 2025 value / 2024 value × 100.",
    zh: "kWh/双 = ΣkWh / Σ双数；kgCO₂e/双 =（范围一+范围二）× 1000 / Σ双数；升/双 = Σm³ × 1000 / Σ双数。指数 = 2025年值 / 2024年值 × 100。",
  },
  ex_calc_int2: {
    vi: "2025: {e} kWh/đôi · {g} kgCO₂e/đôi · {w} lít/đôi.",
    en: "2025: {e} kWh/pair · {g} kgCO₂e/pair · {w} litres/pair.",
    zh: "2025年：{e} kWh/双 · {g} kgCO₂e/双 · {w} 升/双。",
  },
  ex_calc_train: {
    vi: "= Σ giờ đào tạo / nhân viên cuối kỳ. 2025: {h} / {e} = {v}.",
    en: "= Σ training hours / year-end headcount. 2025: {h} / {e} = {v}.",
    zh: "= Σ培训课时 / 期末员工数。2025年：{h} / {e} = {v}。",
  },

  // ---------- Tên KPI (vi giữ nguyên văn docs đã publish) ----------
  ex_kpi_PROD: { vi: "Sản lượng", en: "Production output", zh: "产量" },
  ex_kpi_ELEC: { vi: "Điện mua", en: "Purchased electricity", zh: "购电量" },
  ex_kpi_ELEC_I: { vi: "Cường độ điện", en: "Electricity intensity", zh: "单位电耗" },
  ex_kpi_ENERGY: { vi: "Năng lượng trong tổ chức", en: "Energy within the organization", zh: "组织能耗" },
  ex_kpi_GHG_1: { vi: "Scope 1", en: "Scope 1", zh: "范围一" },
  ex_kpi_GHG_2L: { vi: "Scope 2 địa điểm", en: "Scope 2 location-based", zh: "范围二（区位法）" },
  ex_kpi_GHG_I: { vi: "Cường độ Scope 1 + 2 địa điểm", en: "Scope 1 + 2 location-based intensity", zh: "范围一+二（区位法）强度" },
  ex_kpi_WATER: { vi: "Nước lấy", en: "Water withdrawal", zh: "取水量" },
  ex_kpi_WATER_I: { vi: "Cường độ nước lấy", en: "Water withdrawal intensity", zh: "取水强度" },
  ex_kpi_WASTE: { vi: "Chất thải phát sinh", en: "Waste generated", zh: "废弃物产生量" },
  ex_kpi_RECOVERY: { vi: "Chất thải chuyển tái chế", en: "Waste diverted to recycling", zh: "废弃物转回收利用" },
  ex_kpi_MAT_R: { vi: "Vật liệu đầu vào tái chế", en: "Recycled material input", zh: "再生材料投入" },
  ex_kpi_HEADCOUNT: { vi: "Nhân viên cuối kỳ", en: "Year-end headcount", zh: "期末员工数" },
  ex_kpi_FEMALE: { vi: "Tỷ lệ nữ cuối kỳ", en: "Year-end female share", zh: "期末女性比例" },
  ex_kpi_TRAIN: { vi: "Giờ đào tạo / người cuối kỳ", en: "Training hours / year-end headcount", zh: "培训课时/期末人数" },
  ex_kpi_INJURY: { vi: "Tỷ suất chấn thương ghi nhận", en: "Recorded injury rate", zh: "工伤发生率" },
  ex_kpi_SUP_COVER: { vi: "Nhà cung cấp được đánh giá", en: "Suppliers assessed", zh: "已评估供应商" },

  // ================= CẤU TRÚC ECLAT =================
  rpt_about_h: { vi: "Về báo cáo này", en: "About the Report", zh: "关于本报告" },
  rpt_about_welcome: {
    vi: "Mời bạn đọc Báo cáo ESG của Công ty Giày Minh Họa (gọi tắt là “Minh Họa”). Kể từ khi thành lập (giả định), Minh Họa gắn bó với nghề làm giày và cùng người lao động, đối tác, các bên liên quan tạo ra sản phẩm thân thiện hơn, với tầm nhìn “Phát triển bền vững qua từng đôi giày”. Báo cáo này trình bày chiến lược, quản trị và kết quả phát triển bền vững của Minh Họa trong kịch bản giả định, đồng thời phản hồi các vấn đề mà bên liên quan quan tâm.",
    en: "Welcome to the ESG Report of Minh Hoa Footwear Company (hereinafter “Minh Hoa”). Since its (hypothetical) establishment, Minh Hoa has been devoted to shoemaking and, together with its workers, partners and stakeholders, to creating friendlier products, guided by the vision of “Sustainability in Every Pair”. This report presents Minh Hoa's sustainability strategy, governance and performance in a hypothetical scenario, and responds to the issues stakeholders care about.",
    zh: "欢迎阅读Minh Hoa鞋业公司（以下简称“Minh Hoa”）ESG报告。自（假设）成立以来，Minh Hoa专注制鞋事业，与员工、合作伙伴及利益相关方共同打造更友好的产品，秉持“每一双鞋的可持续发展”愿景。本报告介绍假设情景下Minh Hoa的可持续发展战略、治理与绩效，并回应利益相关方关注的议题。",
  },
  rpt_about_cycle: {
    vi: "Kỳ phát hành: bản mẫu đào tạo 1.0, biên soạn ngày 08/10/2026. Khi áp dụng thực tế, doanh nghiệp nên phát hành báo cáo ESG định kỳ hằng năm (khuyến nghị cùng kỳ với báo cáo tài chính) và công bố trên website chính thức.",
    en: "Issuance: training sample v1.0, prepared on 08/10/2026. In real application, the company should publish the ESG report annually (preferably aligned with the financial reporting cycle) and disclose it on its official website.",
    zh: "发布：培训示例1.0版，编制日期08/10/2026。实际应用中，企业应每年定期发布ESG报告（建议与财务报告周期一致）并在官网披露。",
  },
  rpt_about_boundary: {
    vi: "Phạm vi báo cáo: toàn bộ hoạt động trong ranh giới kiểm soát vận hành của nhà máy CS01 trong kịch bản (không có công ty con). Khi áp dụng thực tế, phạm vi báo cáo nên nhất quán với các đơn vị hợp nhất trong báo cáo tài chính hợp nhất, và mọi khác biệt về phạm vi công bố của chủ đề trọng yếu cần được giải thích trong báo cáo.",
    en: "Reporting boundary: all activities within the operational-control boundary of plant CS01 in this scenario (no subsidiaries). In real application, the reporting boundary should be consistent with the consolidated entities in the consolidated financial statements, and any difference in the disclosure scope of material topics should be explained in the report.",
    zh: "报告边界：本情景中CS01工厂运营控制边界内的全部活动（无子公司）。实际应用中，报告边界应与合并财务报表中的合并主体一致；实质性议题披露范围如有差异，须在报告中说明。",
  },
  rpt_about_period: {
    vi: "Kỳ báo cáo: năm tài chính 2025 (01/01/2025–31/12/2025), nhất quán với kỳ báo cáo tài chính; năm cơ sở 2024. Đơn vị tiền tệ là tỷ đồng Việt Nam trừ khi ghi khác; các chỉ số môi trường và xã hội dùng đơn vị thông dụng và được ghi chú trong bài.",
    en: "Reporting period: fiscal year 2025 (01/01/2025–31/12/2025), aligned with the financial reporting period; base year 2024. Monetary amounts are in VND billion unless noted otherwise; environmental and social indicators use commonly applied units, noted in the text.",
    zh: "报告期间：2025财年（01/01/2025–31/12/2025），与财务报告期间一致；基准年2024。货币单位为十亿越南盾（另有说明除外）；环境与社会指标采用常用单位并在文中注明。",
  },
  rpt_about_restate: {
    vi: "Điều chỉnh số liệu nền: không có trong kịch bản này (dữ liệu 2024 được tạo theo cùng phương pháp). Khi áp dụng thực tế, mọi điều chỉnh hồi tố phải được nêu rõ lý do và ảnh hưởng.",
    en: "Restatements: none in this scenario (the 2024 data was generated with the same methodology). In real application, any retrospective adjustments must state their reasons and impacts.",
    zh: "数据重述：本情景无（2024年数据按同样方法生成）。实际应用中，任何追溯调整须说明理由与影响。",
  },
  rpt_about_contact: {
    vi: "Liên hệ: Ban ESG — Công ty Giày Minh Họa (giả định). Đầu mối phản hồi trong mẫu là vai trò Thư ký Ban ESG, không có email thật.",
    en: "Contact: ESG Committee — Minh Hoa Footwear Company (fictional). The feedback contact in this sample is the role of ESG Committee Secretary; there is no real email.",
    zh: "联系方式：ESG委员会——Minh Hoa鞋业公司（虚构）。本示例反馈联系人为ESG委员会秘书（角色），无真实邮箱。",
  },
  rpt_msg_h: { vi: "Thông điệp của lãnh đạo", en: "Message from Leadership", zh: "管理层致辞" },
  rpt_00_h: { vi: "0. Tổng quan phát triển bền vững", en: "0. Sustainability Overview", zh: "0. 可持续发展总览" },
  rpt_00_intro: {
    vi: "Tổng quan các chỉ số nổi bật năm 2025 so với năm cơ sở 2024 — như “điểm nhấn tài chính” của báo cáo thường niên, nhưng cho phát triển bền vững. Chi tiết phương pháp và bằng chứng ở các chương chuyên đề.",
    en: "Highlights of 2025 against the 2024 baseline — the sustainability equivalent of an annual report's “financial highlights”. Methodologies and evidence are detailed in the thematic chapters.",
    zh: "2025年相对2024基准年的关键指标总览——相当于年报“财务摘要”的可持续发展版。方法与证据详见各专题章节。",
  },
  rpt_1_h: { vi: "1. Nền tảng phát triển bền vững", en: "1. Foundations of Sustainability", zh: "1. 可持续发展基础" },
  rpt_11_h: { vi: "1.1 Hồ sơ doanh nghiệp", en: "1.1 Company Profile", zh: "1.1 企业概况" },
  rpt_11_profile_th: { vi: "Chỉ tiêu|Nội dung (giả định)", en: "Item|Content (fictional)", zh: "项目|内容（虚构）" },
  rpt_11_history: {
    vi: "2012 — Thành lập (giả định), khởi đầu từ gia công giày. | 2015 — Vượt mốc 1 triệu đôi/năm (giả định). | 2018 — Áp dụng ISO 14001 cho hệ thống quản lý môi trường (giả định). | 2021 — Thành lập Ban ESG (giả định). | 2024 — Năm cơ sở cho báo cáo ESG đầu tiên. | 2025 — Phát hành báo cáo ESG đầu tiên (chính là bản mẫu đào tạo này).",
    en: "2012 — Founded (hypothetical), starting from footwear contract manufacturing. | 2015 — Exceeded 1 million pairs/year (hypothetical). | 2018 — Adopted ISO 14001 for the environmental management system (hypothetical). | 2021 — Established the ESG Committee (hypothetical). | 2024 — Base year for the first ESG report. | 2025 — First ESG report issued (this training sample).",
    zh: "2012年——成立（假设），从鞋类代工起步。| 2015年——年产量突破100万双（假设）。| 2018年——环境管理体系采用ISO 14001（假设）。| 2021年——成立ESG委员会（假设）。| 2024年——首份ESG报告的基准年。| 2025年——发布首份ESG报告（即本培训示例）。",
  },
  rpt_12_h: { vi: "1.2 Chiến lược bền vững và quản trị rủi ro", en: "1.2 Sustainability Strategy and Risk Management", zh: "1.2 可持续发展战略与风险管理" },
  rpt_12_strategy: {
    vi: "Chiến lược bền vững của Minh Họa trong kịch bản gắn với chiến lược kinh doanh: giảm tài nguyên trên mỗi đôi giày, bảo đảm an toàn cho người lao động và truy xuất được chuỗi cung ứng. Ba trụ cột — Con người, Chuỗi giá trị, Môi trường — được lồng vào vận hành hằng ngày thay vì đứng ngoài sản xuất. Ban ESG 7 vai trò (lãnh đạo, EHS, nhân sự, mua hàng, sản xuất, tài chính, kiểm soát nội bộ) họp mỗi quý, báo cáo tiến độ cho giám đốc và điều chỉnh mục tiêu theo kết quả.",
    en: "In this scenario, Minh Hoa's sustainability strategy is tied to its business strategy: fewer resources per pair, safe workers, and a traceable supply chain. Three pillars — People, Value Chain, Environment — are embedded in daily operations rather than standing apart from production. The 7-role ESG Committee (leadership, EHS, HR, procurement, production, finance, internal control) meets quarterly, reports progress to the director, and adjusts targets based on results.",
    zh: "本情景中，Minh Hoa的可持续发展战略与经营战略紧密结合：降低单位产品资源消耗、保障员工安全、实现供应链可追溯。三大支柱——人员、价值链、环境——融入日常运营而非游离于生产之外。7个角色的ESG委员会（管理层、EHS、人事、采购、生产、财务、内控）每季度开会，向总经理汇报进展并根据结果调整目标。",
  },
  rpt_13_h: { vi: "1.3 Hiệu quả kinh doanh và quản trị liêm chính", en: "1.3 Business Performance and Integrity Governance", zh: "1.3 经营绩效与廉洁治理" },
  rpt_14_h: { vi: "1.4 Xác định chủ đề trọng yếu", en: "1.4 Identification of Material Topics", zh: "1.4 实质性议题识别" },
  rpt_15_h: { vi: "1.5 Gắn kết bên liên quan", en: "1.5 Stakeholder Engagement", zh: "1.5 利益相关方参与" },
  rpt_2_h: { vi: "2. Con người — nền tảng phát triển", en: "2. People — Our Foundation", zh: "2. 人员——发展基石" },
  rpt_21_h: { vi: "2.1 Quản trị nguồn nhân lực", en: "2.1 Human Resource Management", zh: "2.1 人力资源管理" },
  rpt_22_h: { vi: "2.2 Đào tạo và phát triển nhân tài", en: "2.2 Talent Training and Development", zh: "2.2 人才培养与发展" },
  rpt_22_text: {
    vi: "Năm 2025, tổng 28.800 giờ đào tạo được phân bổ đều 24 giờ/người cuối kỳ cho cả nam và nữ. Nội dung trong kịch bản gồm an toàn lao động, vận hành máy và kỹ năng quản lý ca. Chưa có phân tích hiệu quả đào tạo theo nhóm nghề, cũng như tỷ lệ đánh giá phát triển nghề nghiệp định kỳ — hai nội dung được đưa vào kế hoạch 2026.",
    en: "In 2025, 28,800 training hours were delivered at 24 hours per year-end headcount for both women and men. In-scenario content covered occupational safety, machine operation and shift-leadership skills. There is not yet any analysis of training effectiveness by job family, nor periodic career-development review rates — both are in the 2026 plan.",
    zh: "2025年共开展28,800课时培训，男女均为24课时/期末人数。情景内容包括职业安全、设备操作与班组管理技能。尚未按工种分析培训效果，也无定期的职业发展评估比例——两项均已纳入2026年计划。",
  },
  rpt_23_h: { vi: "2.3 Sức khỏe và an toàn lao động", en: "2.3 Occupational Health and Safety", zh: "2.3 职业健康与安全" },
  rpt_24_h: { vi: "2.4 Điều kiện lao động và nhân quyền", en: "2.4 Working Conditions and Human Rights", zh: "2.4 劳动条件与人权" },
  rpt_3_h: { vi: "3. Chuỗi giá trị bền vững", en: "3. Sustainable Value Chain", zh: "3. 可持续价值链" },
  rpt_31_h: { vi: "3.1 Sản phẩm và đổi mới", en: "3.1 Products and Innovation", zh: "3.1 产品与创新" },
  rpt_31_text: {
    vi: "Giày thành phẩm của Minh Họa trong kịch bản hướng tới độ bền và an toàn vật liệu. Năm 2025 ghi nhận 6 khiếu nại chất lượng sản phẩm: 5 đã xử lý, 1 đang chờ xác định nguyên nhân. Chưa có kiểm nghiệm an toàn sản phẩm đầy đủ, phân loại vi phạm nhãn hàng hoặc hồ sơ quyền riêng tư khách hàng để tuyên bố tuân thủ — báo cáo nêu rõ giới hạn này thay vì công bố tuân thủ chung chung.",
    en: "In this scenario, Minh Hoa's finished footwear targets durability and material safety. 2025 recorded 6 product-quality complaints: 5 resolved, 1 awaiting root-cause determination. There is no full product-safety testing, labelling-violation classification or customer-privacy file to support a compliance claim — the report states this limit plainly instead of declaring generic compliance.",
    zh: "本情景中Minh Hoa成品鞋注重耐用性与材料安全。2025年记录6起产品质量投诉：5起已处理，1起待确定原因。无充分的产品安全检测、标签违规分类或客户隐私档案支撑合规声明——报告如实说明该局限，而非笼统宣称合规。",
  },
  rpt_32_h: { vi: "3.2 Chuỗi cung ứng bền vững", en: "3.2 Sustainable Supply Chain", zh: "3.2 可持续供应链" },
  rpt_33_h: { vi: "3.3 Cộng đồng và đồng hành xã hội", en: "3.3 Community Engagement", zh: "3.3 社区参与" },
  rpt_33_text: {
    vi: "Chương trình cộng đồng giả định trị giá 1 tỷ đồng hỗ trợ đào tạo nghề cho lao động địa phương. Kịch bản chưa có đánh giá kết quả dài hạn và chưa tham vấn đầy đủ nhóm dễ bị tổn thương. Đóng góp này được ghi nhận đúng bản chất thiện nguyện, không bù trừ các tác động môi trường hoặc lao động.",
    en: "The hypothetical VND 1 billion community programme supports vocational training for local workers. The scenario has no long-term outcome evaluation yet and vulnerable groups were not fully consulted. This contribution is recorded for what it is — philanthropy — and does not offset environmental or labour impacts.",
    zh: "假设的10亿越南盾社区项目支持当地劳动者职业培训。本情景尚无长期成效评估，也未充分征询弱势群体。该捐赠如实记录为公益性质，不抵消环境或劳工影响。",
  },
  rpt_4_h: { vi: "4. Môi trường — gìn giữ tài nguyên", en: "4. Environment — Guarding Resources", zh: "4. 环境——守护资源" },
  rpt_41_h: { vi: "4.1 Hệ thống quản lý môi trường", en: "4.1 Environmental Management System", zh: "4.1 环境管理体系" },
  rpt_41_text: {
    vi: "Trong kịch bản, CS01 vận hành hệ thống quản lý môi trường theo ISO 14001 (giả định): chính sách môi trường, nhận diện khía cạnh môi trường, kiểm soát vận hành và ứng phó sự cố. Nước thải được xử lý trước khi xả; chất thải phân loại tại nguồn và chuyển đơn vị có chức năng. Báo cáo không tuyên bố nước thải “đạt chuẩn” khi chưa có kết quả quan trắc thật — mọi kết luận tuân thủ trong dữ liệu thật đều phải dựa trên kỳ quan trắc, thông số, vị trí lấy mẫu và căn cứ so sánh được đính kèm.",
    en: "In this scenario, CS01 operates an ISO 14001-based environmental management system (hypothetical): environmental policy, aspect identification, operational control and emergency response. Wastewater is treated before discharge; waste is segregated at source and transferred to licensed operators. The report does not claim wastewater “meets standards” without real monitoring results — any compliance conclusion in real data must rest on the attached monitoring period, parameters, sampling points and comparison basis.",
    zh: "本情景中CS01运行基于ISO 14001的环境管理体系（假设）：环境方针、环境因素识别、运行控制与应急响应。废水处理后排放；废弃物源头分类并交由有资质单位。无真实监测结果时，报告不宣称废水“达标”——真实数据的任何合规结论须以附带的监测周期、指标、采样点与比对依据为准。",
  },
  rpt_42_h: { vi: "4.2 Năng lượng và khí nhà kính", en: "4.2 Energy and Greenhouse Gases", zh: "4.2 能源与温室气体" },
  rpt_43_h: { vi: "4.3 Nước, chất thải, hóa chất và thiên nhiên", en: "4.3 Water, Waste, Chemicals and Nature", zh: "4.3 水、废弃物、化学品与自然" },
  rpt_5_h: { vi: "5. Hướng tới tương lai", en: "5. Looking Ahead", zh: "5. 展望未来" },
  rpt_51_h: { vi: "5.1 Mục tiêu và kế hoạch 2026", en: "5.1 Targets and the 2026 Plan", zh: "5.1 目标与2026年计划" },
  rpt_51_intro: {
    vi: "Mục tiêu nội bộ dưới đây là quyết định minh họa của kịch bản, chưa được tổ chức thẩm định khí hậu độc lập. Kế hoạch 2026 đi kèm nguồn lực và chủ trì giả định; mỗi CAPA cần người kiểm hiệu lực khác người thực hiện.",
    en: "The internal targets below are illustrative decisions of this scenario, not validated by any independent climate body. The 2026 plan comes with hypothetical resources and owners; each CAPA needs an effectiveness verifier different from the implementer.",
    zh: "以下内部目标为本情景的示例性决策，未经任何独立气候机构核证。2026年计划附假设资源与负责人；每项CAPA的成效核查人须与执行人不同。",
  },
  rpt_52_h: { vi: "5.2 Chất lượng dữ liệu, khoảng trống và cải tiến", en: "5.2 Data Quality, Gaps and Improvement", zh: "5.2 数据质量、缺口与改进" },
  rpt_pa_h: { vi: "Phụ lục A — Bảng KPI đối chiếu", en: "Appendix A — KPI Reconciliation Table", zh: "附录A——KPI核对表" },
  rpt_pb_h: { vi: "Phụ lục B — Dữ liệu tháng và sổ bằng chứng", en: "Appendix B — Monthly Data and Evidence Log", zh: "附录B——月度数据与证据台账" },
  rpt_pc_h: { vi: "Phụ lục C — Chỉ mục GRI tham khảo", en: "Appendix C — GRI Reference Index", zh: "附录C——GRI参考索引" },
  rpt_pd_h: { vi: "Phụ lục D — Cách dùng mẫu và nguồn", en: "Appendix D — Using This Sample, and Sources", zh: "附录D——示例使用方法与来源" },

  rpt_11_prow1: { vi: "Tên doanh nghiệp (giả định)|Công ty Giày Minh Họa", en: "Company name (fictional)|Minh Hoa Footwear Company", zh: "企业名称（虚构）|Minh Hoa鞋业公司" },
  rpt_11_prow2: { vi: "Năm thành lập (giả định)|2012", en: "Year founded (fictional)|2012", zh: "成立年份（虚构）|2012年" },
  rpt_11_prow3: { vi: "Trụ sở (giả định)|Khu công nghiệp giả định, Việt Nam", en: "Headquarters (fictional)|Hypothetical industrial zone, Vietnam", zh: "总部（虚构）|假设工业区，越南" },
  rpt_11_prow4: { vi: "Ngành nghề|Sản xuất giày — cắt, may, dán, hoàn thiện", en: "Business|Footwear manufacturing — cutting, sewing, bonding, finishing", zh: "主营业务|鞋类制造——裁断、缝制、粘合、整理" },
  rpt_11_prow5: { vi: "Nhân viên tại 31/12/2025|{emp} (+ 40 lao động nhà thầu)", en: "Employees at 31/12/2025|{emp} (+ 40 contractor workers)", zh: "截至31/12/2025员工|{emp}人（+40名承包商人员）" },
  rpt_11_prow6: { vi: "Sản lượng 2025|{pairs} đôi thành phẩm", en: "2025 output|{pairs} finished pairs", zh: "2025年产量|{pairs}双成品" },
  rpt_11_prow7: { vi: "Doanh thu 2025 (giả định)|960 tỷ đồng", en: "2025 revenue (fictional)|VND 960 billion", zh: "2025年营收（虚构）|9,600亿越南盾" },
  rpt_11_prow8: { vi: "Cơ sở|01 nhà máy CS01; không có công ty con", en: "Sites|01 plant (CS01); no subsidiaries", zh: "厂区|1家工厂（CS01）；无子公司" },
};

export function rp(lang: ReportLang, key: string): string {
  return P[key]?.[lang] ?? P[key]?.vi ?? key;
}

/** True nếu key tồn tại. */
export function hasProseKey(key: string): boolean {
  return key in P;
}

/** Tất cả key — dùng cho test bao phủ. */
export function allProseKeys(): string[] {
  return Object.keys(P);
}

/** Điền {placeholder} trong template. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}

/** Tách hàng bảng "a|b|c" thành mảng. */
export function cells(key: string, lang: ReportLang): string[] {
  return rp(lang, key).split("|");
}
