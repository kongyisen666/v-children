var URLCommonPrefix = 'https://yisenhost.cn/star-server/'

var URL = {
  // 获取通过微信code换取用户信息
  add_or_update_children: 'children/add_or_update',
  get_children: 'children/get_children',
  add_score: 'children/add_score',
  login_home: 'login/home',
  reward_punish_search_by_type: 'reward_punish/search_by_type',
  score_log_search_by_children_id: 'score_log/search_by_children_id',
  login_get_user: 'login/get_user',
  user_list: 'user/search_list',
  user_activation: 'user/activation',
  prize_search: 'prize/search',
  prize_set_prize: 'prize/set_prize',
  prize_log_add: 'prize_log/add'
}

export default {
  URL,
  URLCommonPrefix
}
