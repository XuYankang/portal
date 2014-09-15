<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://www.webapp.com.vn/tags" prefix="web"%>

<script type="text/javascript">
$(function() {
	FROM_MODULE = URL_COMPANY_EVENTS;
});
</script>

<div class="content_ttpt">
	<input type="hidden" id="fCompanyEvents_pagingInfo_indexPage" value="1" />
	<input type="hidden" id="fCompanyEvents_currentSymbol"
		value="${currentSymbol}" />
	<input type="hidden" id="localNewsTitle"
		value="<s:text name="analysis.stockInfo.news.relate">Tin liên quan</s:text>" />
	<!-- nav -->
	<jsp:include
		page="/WEB-INF/jsps/listedmarket/snippet/si-news-nav.jsp"></jsp:include>

	<div class="content_small">
		<div class="content_tab">
			<!-- left -->
			<div class="content_ttpt" style="width: 630px; float: left; margin-bottom: 20px;">
				<!-- loc thong tin -->
				<div class="box_loc">
					<s:text name="analysis.news.fromDate">Lọc thông tin từ</s:text>
					<input type="text" style="width:90px;"
						name="searchIfoNews.strFromNewsDate"
						id="fCompanyEvents_fromDateId" />&nbsp;&nbsp;&nbsp;
					<s:text name="analysis.news.toDate">đến</s:text>
					<input type="text" style="width:90px;" name="searchIfoNews.strToNewsDate"
						id="fCompanyEvents_toDateId" />
					<input type="button" class="iButton" style="width:88px;margin-left:20px;"
                        id="fCompanyEvents_searchButton"
                        value='<s:text name="button.search"/>'>
				</div>
				<!-- paging -->
				<div id="fSearchSymbol_paging"></div>

				<!-- news content -->
				<div class="ds_news" id="fCompanyEvents_content" rel="thong-tin-co-phieu">
					<img src="<web:url value='/images/ajax-loader.gif'/>" />
				</div>
			</div>
			<!-- end left -->

			<!-- right -->
			<jsp:include page="/WEB-INF/jsps/listedmarket/snippet/right.jsp"></jsp:include>
		</div>
		<!-- end .content_ttpt -->
	</div>
</div>
<!-- end .content_small -->
