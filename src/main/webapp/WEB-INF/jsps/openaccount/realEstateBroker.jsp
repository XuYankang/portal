<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://www.webapp.com.vn/tags" prefix="web"%>

<div id="content_ttpt" style="min-height: 500px;">
	<div class="content_tab">
		<!-- left -->
		<div class="content_ttpt openAccount">
			<web:productSubject var="objProdSub"
				productCode="OPEN_MG_BDS_ACCOUNT" />
			<c:out value="${objProdSub['product'].productOverview}"
				escapeXml="false" />
			<div class="clearfix padding-top10" style="text-align: center">
				<input class="button_dk" type="button" value="Đăng ký" />
			</div>
		</div>
		<!-- end left -->

		<!-- right -->
		<jsp:include
			page="/WEB-INF/jsps/openaccount/snippet/openAccountRightColumn.jsp"></jsp:include>
		<!-- End right -->
	</div>
</div>
