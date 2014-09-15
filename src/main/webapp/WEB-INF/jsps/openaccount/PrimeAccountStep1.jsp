<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/struts-tags" prefix="s"%>
<%@ taglib uri="http://www.webapp.com.vn/tags" prefix="web"%>
<tiles:insertDefinition name="PrimeAccount">
	<tiles:putAttribute name="title">
		<s:text name="web.label.online.account.step1"></s:text>
	</tiles:putAttribute>
	<s:set var="step1" value="true"></s:set>
	<s:set var="tip" value="true"></s:set>
	<s:set var="tip1" value="false"></s:set>
	<tiles:putAttribute name="content">
		<%-- Back Form --%>
		<form method="post" action="<web:url value="/mo-tai-khoan.shtml"/>" id="back">
		</form>
		<form method="post" action="<web:url value="/account/PrimeAccountStep2.shtml"/>" id="next">
			<s:hidden name="account.accountType" value="PRIME_ACCOUNT"></s:hidden>
			<s:hidden name="account.accountType1" value="INDIVIDUAL_ACCOUNT"></s:hidden>
			<s:hidden id="cacheData" name="cacheData"></s:hidden>
			<jsp:include page="/WEB-INF/jsps/openaccount/Step1.jsp"></jsp:include>
		</form>
	</tiles:putAttribute>
</tiles:insertDefinition>